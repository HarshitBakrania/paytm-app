"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString(); //Token which we get from the bank during transactions, dummy token in this case
    const userId = session.user.id;

    if(!userId){
        return {
            message: "You are not logged in!"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId,
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })

    return {
        message: "OnRamp Transaction added successfully"
    }
}