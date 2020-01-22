/// <reference types="node" />
import { IChannelInfo } from './models/channel-info.interface';
import ConstructionValidator from 'pubsub-construction-validator';
import { RedisClient, ClientOpts } from 'redis';
import { EventEmitter } from 'events';
import { IChannelContainer } from 'pubsub-construction-validator/src/app/models/channel-container.interface';
/**
 * The base class from which JobAcceptor and JobRequestor are extended.  Initializes the shared variables and runs the shared tasks.
 * Just seemed like a shame to rewrite the exact same code twice.
 * Also, isn't "protected" the nicest bit of syntactical sugar?
 */
export default class BaseJobHandler {
    protected channels: IChannelInfo[];
    constructor(channels: IChannelInfo[], publisher?: RedisClient, subscriber?: RedisClient, options?: ClientOpts);
    responseNotifier: EventEmitter;
    protected constructionValidator: ConstructionValidator;
    protected publisher: RedisClient;
    protected subscriber: RedisClient;
    protected ipAddress: string;
    protected subPubLinks: {
        [key: string]: string;
    };
    protected pubSubLinks: {
        [key: string]: string;
    };
    protected channelContainer: IChannelContainer | undefined;
    protected subscribeToChannels: (() => void) | undefined;
}
