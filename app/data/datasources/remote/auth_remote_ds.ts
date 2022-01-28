export interface AuthRemoteDs {
    signUp({username, password, email}: {username: string, password: string, email: string}): Promise<void>;
}