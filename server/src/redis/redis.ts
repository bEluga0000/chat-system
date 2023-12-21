import { createClient, RedisClientType} from "redis";

export class RedisSubscriptionManager {
    private static instance: RedisSubscriptionManager;
    private subscriber: RedisClientType;
    public publisher: RedisClientType;
    private subscriptions: Map<string, string[]>;
    private reverseSubscriptions: Map<string, { [userId: string]: { userId: string, ws: any } }>

    private constructor() {
        this.subscriber = createClient();
        this.publisher = createClient();
        this.publisher.connect()
        this.subscriber.connect()
        this.subscriptions = new Map<string, string[]>();
        this.reverseSubscriptions = new Map<string, { [userId: string]: { userId: string, ws: any } }>()
    }

    // how the both subcription and reversesubscription looks like
    // subscriptions
    // {
    //     '1234':['room1','room2','room3']
    // }
    // reverse subcription looks like
    // {
    //     'roomId':["user1Id":{'userId':'hisId',ws:'connectiondestails'}]
    // }


    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisSubscriptionManager();
        }
        return this.instance
    }

    subscribe(userId: string, room: string, ws: any) {
        console.log(this.subscriptions)
        this.subscriptions.set(userId, [
            ...(this.subscriptions.get(userId) || []),
            room,
        ]);
        console.log(this.subscriptions)
        console.log(this.reverseSubscriptions)
        this.reverseSubscriptions.set(room, {
            ...(this.reverseSubscriptions.get(room) || {}),
            [userId]: { userId: userId, ws },
        });
        console.log(this.reverseSubscriptions)

        if (Object.keys(this.reverseSubscriptions.get(room) || {})?.length === 1) {
            console.log(`subscribing message from ${room}`);
            // This is the first subscriber to this room
            this.subscriber.subscribe(room, (payload) => {
                try {
                    // const parsedPayload = JSON.parse(payload);
                    const subscribers = this.reverseSubscriptions.get(room) || {};
                    Object.values(subscribers).forEach(({ ws }) =>
                        ws.send(payload)
                    );
                } catch (e) {
                    console.error("erroneous payload found?");
                }
            });
        }
    }
    unsubscribe(userId:string,room:string)
    {
        this.subscriptions.set(userId,this.subscriptions.get(userId)?.filter((x)=> x!==room)||[])
        if (this.subscriptions.get(userId)?.length === 0) {
            this.subscriptions.delete(userId);
        }
        delete this.reverseSubscriptions.get(room)?.[userId];
        if (
            !this.reverseSubscriptions.get(room) ||
            Object.keys(this.reverseSubscriptions.get(room) || {}).length === 0
        ) {
            console.log("unsubscribing from " + room);
            this.subscriber.unsubscribe(room);
            this.reverseSubscriptions.delete(room);
        }
    }

    async addChatMessage(room: string, message: string) {
        this.publish(room, {
            type: "message",
            payload: {
                message
            }
        })
    }
    publish(room:string,message:any)
    {
        console.log('publishing to room '+ room )
        this.publisher.publish(room, JSON.stringify(message))
    }



}