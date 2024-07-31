import { AppwriteException, Runtime, type Client, type Payload } from '@appwrite.io/console';

export type Specs = {
    cpus: number[];
    memory: number[];
};

/**
 * Variable
 */
type Variable = {
    /**
     * Variable ID.
     */
    $id: string;
    /**
     * Variable creation date in ISO 8601 format.
     */
    $createdAt: string;
    /**
     * Variable creation date in ISO 8601 format.
     */
    $updatedAt: string;
    /**
     * Variable key.
     */
    key: string;
    /**
     * Variable value.
     */
    value: string;
    /**
     * Service to which the variable belongs. Possible values are &quot;project&quot;, &quot;function&quot;
     */
    resourceType: string;
    /**
     * ID of resource to which the variable belongs. If resourceType is &quot;project&quot;, it is empty. If resourceType is &quot;function&quot;, it is ID of the function.
     */
    resourceId: string;
};

export type Func = {
    /**
     * Function ID.
     */
    $id: string;
    /**
     * Function creation date in ISO 8601 format.
     */
    $createdAt: string;
    /**
     * Function update date in ISO 8601 format.
     */
    $updatedAt: string;
    /**
     * Execution permissions.
     */
    execute: string[];
    /**
     * Function name.
     */
    name: string;
    /**
     * Function enabled.
     */
    enabled: boolean;
    /**
     * Is the function deployed with the latest configuration? This is set to false if you&#039;ve changed an environment variables, entrypoint, commands, or other settings that needs redeploy to be applied. When the value is false, redeploy the function to update it with the latest configuration.
     */
    live: boolean;
    /**
     * Whether executions will be logged. When set to false, executions will not be logged, but will reduce resource used by your Appwrite project.
     */
    logging: boolean;
    /**
     * Function execution runtime.
     */
    runtime: string;
    /**
     * Function&#039;s active deployment ID.
     */
    deployment: string;
    /**
     * Function variables.
     */
    vars: Variable[];
    /**
     * Function trigger events.
     */
    events: string[];
    /**
     * Function execution schedult in CRON format.
     */
    schedule: string;
    /**
     * Function execution timeout in seconds.
     */
    timeout: number;
    /**
     * The entrypoint file used to execute the deployment.
     */
    entrypoint: string;
    /**
     * The build command used to build the deployment.
     */
    commands: string;
    /**
     * Version of Open Runtimes used for the function.
     */
    version: string;
    /**
     * Function VCS (Version Control System) installation id.
     */
    installationId: string;
    /**
     * VCS (Version Control System) Repository ID
     */
    providerRepositoryId: string;
    /**
     * VCS (Version Control System) branch name
     */
    providerBranch: string;
    /**
     * Path to function in VCS (Version Control System) repository
     */
    providerRootDirectory: string;
    /**
     * Is VCS (Version Control System) connection is in silent mode? When in silence mode, no comments will be posted on the repository pull or merge requests
     */
    providerSilentMode: boolean;
    /**
     * Runtime Size
     */
    size: string;
};

export type Size = {
    slug: string;
    plan: string;
    cpus: number;
    memory: number;
    enabled: boolean;
};

export type Sizes = {
    sizes: Size[];
};

export enum FunctionUsageRange {
    TwentyFourHours = '24h',
    ThirtyDays = '30d',
    NinetyDays = '90d'
}

/**
 * Metric
 */
export type Metric = {
    /**
     * The value of this metric at the timestamp.
     */
    value: number;
    /**
     * The date at which this metric was aggregated in ISO 8601 format.
     */
    date: string;
};
/**
 * Metric Breakdown
 */
export type MetricBreakdown = {
    /**
     * Resource ID.
     */
    resourceId: string;
    /**
     * Resource name.
     */
    name: string;
    /**
     * The value of this metric at the timestamp.
     */
    value: number;
};

/**
 * UsageFunction
 */
export type UsageFunction = {
    /**
     * The time range of the usage stats.
     */
    range: string;
    /**
     * Total aggregated number of function deployments.
     */
    deploymentsTotal: number;
    /**
     * Total aggregated sum of function deployments storage.
     */
    deploymentsStorageTotal: number;
    /**
     * Total aggregated number of function builds.
     */
    buildsTotal: number;
    /**
     * total aggregated sum of function builds storage.
     */
    buildsStorageTotal: number;
    /**
     * Total aggregated sum of function builds compute time.
     */
    buildsTimeTotal: number;
    /**
     * Total  aggregated number of function executions.
     */
    executionsTotal: number;
    /**
     * Total aggregated sum of function  executions compute time.
     */
    executionsTimeTotal: number;
    /**
     * Total amount fo executions mbSeconds
     */
    executionsMbSecondsTotal: number;
    /**
     * Aggregated number of function deployments per period.
     */
    deployments: Metric[];
    /**
     * Aggregated number of  function deployments storage per period.
     */
    deploymentsStorage: Metric[];
    /**
     * Aggregated number of function builds per period.
     */
    builds: Metric[];
    /**
     * Aggregated sum of function builds storage per period.
     */
    buildsStorage: Metric[];
    /**
     * Aggregated sum of function builds compute time per period.
     */
    buildsTime: Metric[];
    /**
     * Aggregated number of function executions per period.
     */
    executions: Metric[];
    /**
     * Aggregated number of function executions compute time per period.
     */
    executionsTime: Metric[];
    /**
     * Aggregated number of function executions compute time per period.
     */
    executionsMbSeconds: Metric[];
};

export class SizesFunctions {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getSizes(): Promise<Sizes[]> {
        const path = '/functions/sizes';

        const uri = new URL(this.client.config.endpoint + path);
        return await this.client.call('GET', uri, {
            'content-type': 'application/json'
        });
    }

    /**
     * Update function
     *
     * Update function by its unique ID.
     *
     * @param {string} functionId
     * @param {string} name
     * @param {Runtime} runtime
     * @param {string[]} execute
     * @param {string[]} events
     * @param {string} schedule
     * @param {number} timeout
     * @param {boolean} enabled
     * @param {boolean} logging
     * @param {string} entrypoint
     * @param {string} commands
     * @param {string} installationId
     * @param {string} providerRepositoryId
     * @param {string} providerBranch
     * @param {boolean} providerSilentMode
     * @param {string} providerRootDirectory
     * @param {number} cpus
     * @param {number} memory
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async update(
        functionId: string,
        name: string,
        runtime?: Runtime,
        execute?: string[],
        events?: string[],
        schedule?: string,
        timeout?: number,
        enabled?: boolean,
        logging?: boolean,
        entrypoint?: string,
        commands?: string,
        installationId?: string,
        providerRepositoryId?: string,
        providerBranch?: string,
        providerSilentMode?: boolean,
        providerRootDirectory?: string,
        size?: string
    ): Promise<Func> {
        if (typeof functionId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "functionId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }

        const apiPath = '/functions/{functionId}'.replace('{functionId}', functionId);
        const payload: Payload = {};

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof runtime !== 'undefined') {
            payload['runtime'] = runtime;
        }

        if (typeof execute !== 'undefined') {
            payload['execute'] = execute;
        }

        if (typeof events !== 'undefined') {
            payload['events'] = events;
        }

        if (typeof schedule !== 'undefined') {
            payload['schedule'] = schedule;
        }

        if (typeof timeout !== 'undefined') {
            payload['timeout'] = timeout;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof logging !== 'undefined') {
            payload['logging'] = logging;
        }

        if (typeof entrypoint !== 'undefined') {
            payload['entrypoint'] = entrypoint;
        }

        if (typeof commands !== 'undefined') {
            payload['commands'] = commands;
        }

        if (typeof installationId !== 'undefined') {
            payload['installationId'] = installationId;
        }

        if (typeof providerRepositoryId !== 'undefined') {
            payload['providerRepositoryId'] = providerRepositoryId;
        }

        if (typeof providerBranch !== 'undefined') {
            payload['providerBranch'] = providerBranch;
        }

        if (typeof providerSilentMode !== 'undefined') {
            payload['providerSilentMode'] = providerSilentMode;
        }

        if (typeof providerRootDirectory !== 'undefined') {
            payload['providerRootDirectory'] = providerRootDirectory;
        }

        if (typeof size !== 'undefined') {
            payload['size'] = size;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call(
            'put',
            uri,
            {
                'content-type': 'application/json'
            },
            payload
        );
    }

    /**
     * Get function usage
     *
     *
     * @param {string} functionId
     * @param {FunctionUsageRange} range
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async getFunctionUsage(functionId: string, range?: FunctionUsageRange): Promise<UsageFunction> {
        if (typeof functionId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "functionId"');
        }

        const apiPath = '/functions/{functionId}/usage'.replace('{functionId}', functionId);
        const payload: Payload = {};

        if (typeof range !== 'undefined') {
            payload['range'] = range;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call(
            'get',
            uri,
            {
                'content-type': 'application/json'
            },
            payload
        );
    }
}
