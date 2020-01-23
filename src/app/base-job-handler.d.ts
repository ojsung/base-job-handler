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
export declare abstract class BaseJobHandler {
    protected readonly channels: IChannelInfo[];
    /**
     * The base class from which JobAcceptor and JobRequestor are extended.  Initializes the shared variables and runs the shared tasks.
     * @param channels An array of IChannelInfo to which the JobRequestor may need to post
     * @param [publisher] Optional.  If it is not provided, the 'options' paramter must be given.  A RedisClient instance that is NOT set as a subscriber
     * @param [subscriber] Optional. If it is not provided, but publisher is, it will be duplicated from the publisher.  If publisher is not provided, then the
     * 'options' parameter must be given.
     * @param [options] Optional.  If it is not provided, then the 'publisher' parameter must be given.  The Redis.ClientOpts to use to create the RedisClient.
     */
    constructor(channels: IChannelInfo[], publisher?: RedisClient, subscriber?: RedisClient, options?: ClientOpts);
    readonly responseNotifier: EventEmitter;
    protected readonly constructionValidator: ConstructionValidator;
    protected readonly ipAddress: string;
    protected readonly acceptanceToPostingChannelDictionary: {
        [key: string]: string;
    };
    protected readonly postingToAcceptanceChannelDictionary: {
        [key: string]: string;
    };
    protected readonly subscribedChannels: string[];
    protected publisher: RedisClient;
    protected subscriber: RedisClient;
    protected channelContainer: IChannelContainer | undefined;
    protected subscribeToChannels: (() => void) | undefined;
    protected subscribed: boolean;
    protected validateSubscriptions(): void;
}
