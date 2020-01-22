import { IChannelInfo } from './models/channel-info.interface'
import retrieveIp from 'retrieve-ip'
import ConstructionValidator from 'pubsub-construction-validator'
import { RedisClient, ClientOpts } from 'redis'
import { EventEmitter } from 'events'
import { IChannelContainer } from 'pubsub-construction-validator/src/app/models/channel-container.interface'

/**
 * The base class from which JobAcceptor and JobRequestor are extended.  Initializes the shared variables and runs the shared tasks.
 * Just seemed like a shame to rewrite the exact same code twice.
 * Also, isn't "protected" the nicest bit of syntactical sugar?
 */
export default class BaseJobHandler {
  constructor(
    protected channels: IChannelInfo[],
    publisher?: RedisClient,
    subscriber?: RedisClient,
    options?: ClientOpts
  ) {
    // Calls validatePubSub to make sure that either the publisher or options parameters were given and valid.  If not,
    // this will throw an error
    ;[this.publisher, this.subscriber] = this.constructionValidator.validatePubSub(
      publisher,
      subscriber,
      options
    )
    // Fill the channel list with all the channels that should be subscribed to/published to
    this.channelContainer = this.constructionValidator.fillChannelContainer(this.channels)
    const channelList = Object.keys(this.channelContainer)
    channelList.forEach(channel => {
      const channelSubName = channel + '-sub'
      const channelPubName = channel + '-pub'
      this.pubSubLinks[channelPubName] = channelSubName
      this.subPubLinks[channelSubName] = channelPubName
      // subscribe to all the channels in the list
      this.subscriber.subscribe(channel)
    })
  }
  public responseNotifier = new EventEmitter()
  protected constructionValidator: ConstructionValidator = new ConstructionValidator()
  protected publisher: RedisClient
  protected subscriber: RedisClient
  protected ipAddress: string = retrieveIp('IPv6', 'all', false, 1)[0]
  protected subPubLinks: { [key: string]: string } = {}
  protected pubSubLinks: { [key: string]: string } = {}
  protected channelContainer: IChannelContainer
}
