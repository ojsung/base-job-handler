"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const retrieve_ip_1 = __importDefault(require("retrieve-ip"));
const pubsub_construction_validator_1 = __importDefault(require("pubsub-construction-validator"));
const events_1 = require("events");
class JobAcceptor {
    constructor(channels, publisher, subscriber, options) {
        this.channels = channels;
        this.responseNotifier = new events_1.EventEmitter();
        this.constructionValidator = new pubsub_construction_validator_1.default();
        this.ipAddress = retrieve_ip_1.default('IPv6', 'all', false, 1)[0];
        this.jobCount = 0;
        this.subPubLinks = {};
        this.pubSubLinks = {};
        // Calls validatePubSub to make sure that either the publisher or options parameters were given and valid.  If not,
        // this will throw an error
        ;
        [this.publisher, this.subscriber] = this.constructionValidator.validatePubSub(publisher, subscriber, options);
        // Fill the channel list with all the channels that should be subscribed to/published to
        this.channelContainer = this.constructionValidator.fillChannelContainer(this.channels);
        const channelList = Object.keys(this.channelContainer);
        channelList.forEach(channel => {
            const channelSubName = channel + '-sub';
            const channelPubName = channel + '-pub';
            this.pubSubLinks[channelPubName] = channelSubName;
            this.subPubLinks[channelSubName] = channelPubName;
            // subscribe to all the channels in the list
            this.subscriber.subscribe(channel);
        });
    }
}
exports.default = JobAcceptor;
//# sourceMappingURL=index.js.map