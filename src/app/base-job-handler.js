"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const retrieve_ip_1 = __importDefault(require("retrieve-ip"));
const pubsub_construction_validator_1 = __importDefault(require("pubsub-construction-validator"));
const events_1 = require("events");
/**
 * The base class from which JobAcceptor and JobRequestor are extended.  Initializes the shared variables and runs the shared tasks.
 * Just seemed like a shame to rewrite the exact same code twice.
 * Also, isn't "protected" the nicest bit of syntactical sugar?
 */
class BaseJobHandler {
    /**
     * The base class from which JobAcceptor and JobRequestor are extended.  Initializes the shared variables and runs the shared tasks.
     * @param channels An array of IChannelInfo to which the JobRequestor may need to post
     * @param [publisher] Optional.  If it is not provided, the 'options' paramter must be given.  A RedisClient instance that is NOT set as a subscriber
     * @param [subscriber] Optional. If it is not provided, but publisher is, it will be duplicated from the publisher.  If publisher is not provided, then the
     * 'options' parameter must be given.
     * @param [options] Optional.  If it is not provided, then the 'publisher' parameter must be given.  The Redis.ClientOpts to use to create the RedisClient.
     */
    constructor(channels, publisher, subscriber, options) {
        this.channels = channels;
        this.responseNotifier = new events_1.EventEmitter();
        this.constructionValidator = new pubsub_construction_validator_1.default();
        this.ipAddress = retrieve_ip_1.default('IPv6', 'all', false, 1)[0];
        this.acceptanceToPostingChannelDictionary = {};
        this.postingToAcceptanceChannelDictionary = {};
        this.subscribedChannels = [];
        this.subscribed = false;
        // Calls validatePubSub to make sure that either the publisher or options parameters were given and valid.  If not,
        // this will throw an error
        ;
        [this.publisher, this.subscriber] = this.constructionValidator.validatePubSub(publisher, subscriber, options);
    }
    validateSubscriptions() {
        if (!this.subscribed) {
            this.subscriber.subscribe(this.subscribedChannels);
            this.subscribed = true;
        }
    }
}
exports.BaseJobHandler = BaseJobHandler;
//# sourceMappingURL=base-job-handler.js.map