import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type HealthCondition = {
    __kind__: "osteoporosis";
    osteoporosis: null;
} | {
    __kind__: "visionImpairment";
    visionImpairment: null;
} | {
    __kind__: "dizziness";
    dizziness: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "parkinsons";
    parkinsons: null;
} | {
    __kind__: "balanceDisorder";
    balanceDisorder: null;
} | {
    __kind__: "arthritis";
    arthritis: null;
};
export type Time = bigint;
export interface DailyCheckIn {
    localDate: string;
    medicationChanges: boolean;
    dizziness: boolean;
    alcoholIntake: boolean;
    fatigue: boolean;
    sleepQualityGood: boolean;
    visionIssues: boolean;
    unsteadiness: boolean;
    actualFall: boolean;
    nearFall: boolean;
    timestamp: Time;
    newPain: boolean;
}
export type MobilityAid = {
    __kind__: "other";
    other: string;
} | {
    __kind__: "cane";
    cane: null;
} | {
    __kind__: "none";
    none: null;
} | {
    __kind__: "wheelchair";
    wheelchair: null;
} | {
    __kind__: "walker";
    walker: null;
};
export interface RiskAssessment {
    contributingFactors: Array<string>;
    riskLevel: RiskLevel;
    riskScore: bigint;
}
export interface UserProfile {
    age: bigint;
    sex?: Sex;
    hadFallLast12Months: boolean;
    hasBalanceAffectingMedications: boolean;
    heightCm?: number;
    mobilityAids: Array<MobilityAid>;
    weightKg?: number;
    healthConditions: Array<HealthCondition>;
    fallCountLast12Months: bigint;
}
export enum RiskLevel {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum Sex {
    other = "other",
    female = "female",
    male = "male",
    unknown_ = "unknown"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerCheckIns(limit: bigint): Promise<Array<DailyCheckIn>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCheckInByDate(date: string): Promise<DailyCheckIn | null>;
    getCurrentRiskAssessment(): Promise<RiskAssessment | null>;
    getRiskHistory(user: Principal, limit: bigint): Promise<Array<[DailyCheckIn, RiskAssessment]>>;
    getUserCheckIns(user: Principal, limit: bigint): Promise<Array<DailyCheckIn>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitCheckIn(checkIn: DailyCheckIn): Promise<void>;
}
