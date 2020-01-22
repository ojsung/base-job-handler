/// <reference types="node" />
import { IChannelInfo } from './models/channel-info.interface';
import ConstructionValidator from 'pubsub-construction-validator';
import { RedisClient, ClientOpts } from 'redis';
import { EventEmitter } from 'events';
import { IChannelContainer } from 'pubsub-construction-validator/src/app/models/channel-container.interface';
export default class JobAcceptor {
    protected channels: IChannelInfo[];
    constructor(channels: IChannelInfo[], publisher?: RedisClient, subscriber?: RedisClient, options?: ClientOpts);
    responseNotifier: EventEmitter;
    protected constructionValidator: ConstructionValidator;
    protected publisher: RedisClient;
    protected subscriber: RedisClient;
    protected ipAddress: string;
    protected jobCount: number;
    protected subPubLinks: {
        [key: string]: string;
    };
    protected pubSubLinks: {
        [key: string]: string;
    };
    protected channelContainer: IChannelContainer;
}
