import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";
import { ILogger } from "plugin-api";
import { BlockDetailsStoreFactory } from "app/shared/data/block/details/BlockDetailsStoreFactory";
import { MementoDataSource } from "app/eth-memento/MementoDataSource";
import { TxLiteByAccountStoreFactory } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStoreFactory";
import { BlockValueStoreFactory } from "app/shared/data/block/value/BlockValueStoreFactory";
import { TxDetailsStoreFactory } from "app/eth-memento/data/tx/details/TxDetailsStoreFactory";
import { LogEventsStoreFactory } from "app/eth-memento/data/logEvents/LogEventsStoreFactory";
import { UncleDetailsStoreFactory } from "app/shared/data/uncle/UncleDetailsStoreFactory";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { LatestBlockNumberApiFactory } from "app/eth-memento/data/block/latest/LatestBlockNumberApiFactory";
import { SearchFactory } from "app/eth-memento/data/search/SearchFactory";
import { LastBlockWatcher } from "app/shared/data/watcher/LastBlockWatcher";
import { AccountBalanceApiFactory } from "app/eth-memento/data/account/AccountBalanceApiFactory";
import { AccountDetailsApiFactory } from "app/eth-memento/data/account/AccountDetailsApiFactory";
import {ContractWeb3ApiFactory} from "app/eth-extended/data/contract/ContractWeb3ApiFactory";
import {EthExtendedPluginConfig} from "app/eth-extended/EthExtendedPluginConfig";
import {Web3Factory} from "app/eth-extended/Web3Factory";

export class MementoDataSourceFactory {
    create(config: EthMementoPluginConfig, configExtended: EthExtendedPluginConfig, logger: ILogger) {
        let blockStateStore = new BlockStateStore();

        let latestBlockApi = new LatestBlockNumberApiFactory(config).create();
        let lastBlockWatcher = new LastBlockWatcher(latestBlockApi, blockStateStore, logger);

        let blockDetailsStore = new BlockDetailsStoreFactory(config).create();
        let blockValueStore = new BlockValueStoreFactory(config).create();
        let txByAccountStore = new TxLiteByAccountStoreFactory(config).create();
        let txDetailsStore = new TxDetailsStoreFactory(config).create();
        let logEventsStore = new LogEventsStoreFactory(config).create();
        let uncleDetailsStore = new UncleDetailsStoreFactory(config).create();

        let search = new SearchFactory(config).create(blockStateStore);

        let accountBalanceApi = new AccountBalanceApiFactory(config).create();
        let accountDetailsApi = new AccountDetailsApiFactory(config).create();

        let web3Factory = new Web3Factory(configExtended);
        let contractWeb3Api = (new ContractWeb3ApiFactory(web3Factory)).create();

        return new MementoDataSource(
            lastBlockWatcher,
            {
                blockStateStore,
                blockDetailsStore,
                blockValueStore,
                txDetailsStore,
                txByAccountStore,
                logEventsStore,
                uncleDetailsStore,
                search,
                accountBalanceApi,
                accountDetailsApi
            },
            contractWeb3Api
        );
    }
}
