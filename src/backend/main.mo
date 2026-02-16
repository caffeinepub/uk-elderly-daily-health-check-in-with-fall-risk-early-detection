import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Sex = {
    #male;
    #female;
    #other;
    #unknown;
  };

  public type MobilityAid = {
    #none;
    #cane;
    #walker;
    #wheelchair;
    #other : Text;
  };

  public type HealthCondition = {
    #dizziness;
    #arthritis;
    #parkinsons;
    #visionImpairment;
    #balanceDisorder;
    #osteoporosis;
    #other : Text;
  };

  public type UserProfile = {
    age : Nat;
    sex : ?Sex;
    heightCm : ?Float;
    weightKg : ?Float;
    mobilityAids : [MobilityAid];
    hadFallLast12Months : Bool;
    fallCountLast12Months : Nat;
    hasBalanceAffectingMedications : Bool;
    healthConditions : [HealthCondition];
  };

  public type RiskLevel = {
    #low;
    #medium;
    #high;
  };

  public type DailyCheckIn = {
    timestamp : Time.Time;
    localDate : Text;
    dizziness : Bool;
    unsteadiness : Bool;
    newPain : Bool;
    fatigue : Bool;
    visionIssues : Bool;
    medicationChanges : Bool;
    alcoholIntake : Bool;
    sleepQualityGood : Bool;
    nearFall : Bool;
    actualFall : Bool;
  };

  public type RiskAssessment = {
    riskScore : Nat;
    riskLevel : RiskLevel;
    contributingFactors : [Text];
  };

  var nextCheckInId = 0;
  let userProfiles = Map.empty<Principal, UserProfile>();
  let checkIns = Map.empty<Principal, List.List<(Nat, DailyCheckIn)>>();

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    if (profile.age < 65) {
      Runtime.trap("Age must be 65 or older");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitCheckIn(checkIn : DailyCheckIn) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit check-ins");
    };

    switch (checkIns.get(caller)) {
      case (?checks) {
        if (checks.values().any(func((_, c)) { c.localDate == checkIn.localDate })) {
          Runtime.trap("A check-in for this date already exists");
        };
      };
      case (null) {};
    };

    let id = nextCheckInId;
    nextCheckInId += 1;

    let newCheck = (id, checkIn);
    switch (checkIns.get(caller)) {
      case (?checks) {
        checks.add(newCheck);
        checkIns.add(caller, checks);
      };
      case (null) {
        let newChecks = List.fromArray<(Nat, DailyCheckIn)>([(id, checkIn)]);
        checkIns.add(caller, newChecks);
      };
    };
  };

  module DailyCheckIn {
    public func compareLeftTupleByTimestamp((_, checkIn1) : (Nat, DailyCheckIn), (_, checkIn2) : (Nat, DailyCheckIn)) : Order.Order {
      Int.compare(checkIn1.timestamp, checkIn2.timestamp);
    };
  };

  public shared ({ caller }) func getUserCheckIns(user : Principal, limit : Nat) : async [DailyCheckIn] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own check-ins");
    };

    switch (checkIns.get(user)) {
      case (?checks) {
        let sortedChecks = checks.toArray().sliceToArray(0, checks.size()).sort(DailyCheckIn.compareLeftTupleByTimestamp);
        let reversedSortedChecks = sortedChecks.reverse();
        let resultChecks = reversedSortedChecks.sliceToArray(0, Nat.min(limit, reversedSortedChecks.size()));
        resultChecks.map<(Nat, DailyCheckIn), DailyCheckIn>(func((_, c)) { c });
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getCallerCheckIns(limit : Nat) : async [DailyCheckIn] {
    switch (checkIns.get(caller)) {
      case (?checks) {
        let sortedChecks = checks.toArray().sliceToArray(0, checks.size()).sort(DailyCheckIn.compareLeftTupleByTimestamp);
        let reversedSortedChecks = sortedChecks.reverse();
        let n = Nat.min(limit, reversedSortedChecks.size());
        let resultChecks = reversedSortedChecks.sliceToArray(0, n);
        resultChecks.map<(Nat, DailyCheckIn), DailyCheckIn>(func((_, c)) { c });
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getCheckInByDate(date : Text) : async ?DailyCheckIn {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view check-ins");
    };

    let user = caller;
    switch (checkIns.get(user)) {
      case (?checks) {
        switch (checks.values().find(func((_, c)) { c.localDate == date })) {
          case (?check) { ?check.1 };
          case (null) { null };
        };
      };
      case (null) { null };
    };
  };

  public query ({ caller }) func getRiskHistory(user : Principal, limit : Nat) : async [(DailyCheckIn, RiskAssessment)] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own risk history");
    };

    switch (checkIns.get(user)) {
      case (?checks) {
        let sortedChecks = checks.toArray().sliceToArray(0, checks.size()).sort(DailyCheckIn.compareLeftTupleByTimestamp);
        let reversedSortedChecks = sortedChecks.reverse();

        let riskAssessmentsWithKeys = reversedSortedChecks.sliceToArray(0, Nat.min(limit, reversedSortedChecks.size())).enumerate().toArray();

        riskAssessmentsWithKeys.map<(Nat, (Nat, DailyCheckIn)), (DailyCheckIn, RiskAssessment)>(
          func((_, (id, checkIn))) {
            let assessment = computeRisk(checkIn);
            (checkIn, assessment);
          }
        );
      };
      case (null) { [] };
    };
  };

  func computeRisk(checkIn : DailyCheckIn) : RiskAssessment {
    var score = 0;
    let factors = List.empty<Text>();

    if (checkIn.dizziness or checkIn.unsteadiness) {
      score += 30;
      factors.add("Reported dizziness/unsteadiness");
    };

    if (checkIn.newPain or checkIn.fatigue) {
      score += 20;
      factors.add("New pain or fatigue reported");
    };

    if (checkIn.visionIssues or checkIn.medicationChanges) {
      score += 15;
      factors.add("Vision issues or medication changes");
    };

    if (checkIn.alcoholIntake or not checkIn.sleepQualityGood) {
      score += 10;
      factors.add("Alcohol intake or poor sleep quality");
    };

    if (checkIn.nearFall) {
      score += 30;
      factors.add("Reported near-fall incident");
    };

    if (checkIn.actualFall) {
      score += 40;
      factors.add("Reported an actual fall");
    };

    if (score > 100) { score := 100 };

    let riskLevel : RiskLevel = if (score <= 39) {
      #low;
    } else if (score <= 69) {
      #medium;
    } else {
      #high;
    };

    {
      riskScore = score;
      riskLevel;
      contributingFactors = factors.toArray();
    };
  };

  func findLatestCheckIn(arr : [(Nat, DailyCheckIn)]) : ?(Nat, DailyCheckIn) {
    if (arr.size() == 0) { return null };
    ?arr[0];
  };

  public query ({ caller }) func getCurrentRiskAssessment() : async ?RiskAssessment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view risk assessments");
    };

    switch (checkIns.get(caller)) {
      case (?checks) {
        let sortedChecks = checks.toArray().sliceToArray(0, checks.size()).sort(DailyCheckIn.compareLeftTupleByTimestamp);
        let reversedSortedChecks = sortedChecks.reverse();
        switch (findLatestCheckIn(reversedSortedChecks)) {
          case (?latestCheck) {
            ?computeRisk(latestCheck.1);
          };
          case (null) { null };
        };
      };
      case (null) { null };
    };
  };
};
