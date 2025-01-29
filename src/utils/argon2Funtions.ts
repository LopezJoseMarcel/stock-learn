import { hash, verify  } from "@node-rs/argon2";

export async function createHash(password:string) : Promise<string> {
    const hashPassWord = await hash(password);
    
    return hashPassWord; 
}

export async function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return await verify(hashedPassword, password);
}

