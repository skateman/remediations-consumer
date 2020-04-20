import * as convict from 'convict';
import formats from './formats';

convict.addFormats(formats);

const config = convict({
    env: {
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    commit: {
        format: String,
        default: undefined,
        env: 'OPENSHIFT_BUILD_COMMIT'
    },
    logging: {
        level: {
            format: String,
            default: 'trace',
            env: 'LOG_LEVEL'
        },
        pretty: {
            format: Boolean,
            default: false,
            env: 'LOG_PRETTY'
        },
        cloudwatch: {
            enabled: {
                format: Boolean,
                default: false,
                env: 'LOG_CW_ENABLED'
            },
            level: {
                format: String,
                default: 'debug',
                env: 'LOG_CW_LEVEL'
            },
            group: {
                format: String,
                default: 'remediations-local',
                env: 'LOG_CW_GROUP'
            },
            prefix: {
                format: String,
                default: 'remediations-consumer',
                env: 'LOG_CW_PREFIX'
            },
            interval: {
                format: Number,
                default: 1000,
                env: 'LOG_CW_INTERVAL'
            },
            key: {
                format: String,
                default: undefined,
                env: 'LOG_CW_KEY'
            },
            secret: {
                format: String,
                default: undefined,
                env: 'LOG_CW_SECRET',
                sensitive: true
            },
            region: {
                format: String,
                default: 'us-east-1',
                env: 'LOG_CW_REGION'
            }
        }
    },

    db: {
        connection: {
            user: {
                format: String,
                default: 'postgres',
                env: 'DB_USERNAME'
            },
            password: {
                format: String,
                default: 'remediations',
                env: 'DB_PASSWORD',
                sensitive: true
            },
            database: {
                format: String,
                default: 'remediations_consumer_test',
                env: 'DB_DATABASE'
            },
            host: {
                format: String,
                default: '127.0.0.1',
                env: 'DB_HOST'
            },
            port: {
                format: Number,
                default: 5432,
                env: 'DB_PORT'
            },
            ssl: {
                ca: {
                    format: 'file',
                    default: undefined,
                    env: 'DB_CA',
                    sensitive: true
                }
            }
        },
        dryRun: {
            format: Boolean,
            default: false,
            env: 'DB_DRY_RUN'
        },
        pool: {
            min: {
                format: 'nat',
                default: 2,
                env: 'DB_POOL_MIN'
            },
            max: {
                format: 'nat',
                default: 5,
                env: 'DB_POOL_MAX'
            }
        },
        ssl: {
            enabled: {
                format: Boolean,
                default: true,
                env: 'DB_SSL_ENABLED'
            }
        }
    },

    kafka: {
        host: {
            format: String,
            default: 'localhost:29092',
            env: 'KAFKA_HOST'
        },
        autoCommit: {
            format: Boolean,
            default: false,
            env: 'KAFKA_AUTOCOMMIT'
        },
        concurrency: {
            format: 'nat',
            default: 1,
            env: 'KAFKA_CONCURRENCY'
        },
        consumerGroup: {
            format: String,
            default: 'remediations-consumer',
            env: 'KAFKA_CONSUMER_GROUP'
        },
        logging: {
            format: Boolean,
            default: false,
            env: 'KAFKA_LOGGING'
        },
        topics: {
            inventory: {
                topic: {
                    format: String,
                    default: 'platform.inventory.events',
                    env: 'INVENTORY_TOPIC'
                },
                resetOffsets: {
                    format: Boolean,
                    default: false,
                    env: 'INVENTORY_RESET_OFFSETS'
                }
            },
            receptor: {
                topic: {
                    format: String,
                    default: 'platform.receptor-controller.responses',
                    env: 'RECEPTOR_TOPIC'
                },
                resetOffsets: {
                    format: Boolean,
                    default: false,
                    env: 'RECEPTOR_RESET_OFFSETS'
                }
            }
        }
    },

    metrics: {
        prefix: {
            format: String,
            default: 'remediations_consumer_',
            env: 'METRICS_PREFIX'
        },
        port: {
            format: 'nat',
            default: 9006,
            env: 'METRICS_PORT'
        }
    }
});

config.validate({ strict: true });

export default config.get();
export const sanitized = config.toString();
