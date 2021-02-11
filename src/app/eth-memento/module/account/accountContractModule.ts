import { IModuleDef } from "plugin-api/IModuleDef";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { accountContextType } from "app/shared/context/accountContextType";
import {MementoDataSource} from "app/eth-memento/MementoDataSource";
import {ContractModuleSlotType} from "app/eth-extended/module/account/contract/ContractModuleSlotType";
import {Contract, IContractProps} from "app/eth-memento/module/account/component/Contract";
import {IAccountDetails} from "app/eth-memento/data/account/IAccountDetails";

export const accountContractModule:
(dataSource: MementoDataSource) => IModuleDef<IContractProps, IAccountContext, ContractModuleSlotType> =
(dataSource) => ({
    contextType: accountContextType,
    slotNames: [ContractModuleSlotType.AccordionItems],
    dataAdapters: [{
        ref: AlethioAdapterType.AccountDetailsLite
    }],

    getContentComponent: async () => Contract,
    getContentProps(data) {
        let { translation, logger, locale, asyncData } = data;

        let accountDetails = asyncData.get(AlethioAdapterType.AccountDetailsLite)!.data as IAccountDetails;

        let props: IContractProps = {
            accountDetails: accountDetails,
            locale: locale,
            logger: logger,
            translation: translation,
            contractWeb3Api: dataSource.contractWeb3Api
        };
        return props;
    },
    getHelpComponent: () => ({ translation }) => translation.get("accountView.contract.help") as any
});
