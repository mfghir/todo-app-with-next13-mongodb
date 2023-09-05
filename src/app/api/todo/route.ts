import clientPromise from "@/lib/mongoDB";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
 


export async function GET() {
    const client = await clientPromise
    const collection = client.db().collection('todo')
    try{
        const todos = await collection.find({}).toArray()
        return NextResponse.json(todos ,{status: 200})

    }
}