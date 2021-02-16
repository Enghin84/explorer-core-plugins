import * as React from "react";
import { ResponsiveContainer, MinimumWidth } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";
import { ITranslation } from "plugin-api/ITranslation";
import { ILogger } from "plugin-api/ILogger";
import { ContractDetails } from "./ContractDetails";
import {ContractWeb3Api} from "app/eth-extended/data/contract/ContractWeb3Api";
import {IAccountDetails} from "app/eth-memento/data/account/IAccountDetails";

export interface IContractProps {
    locale: string;
    translation: ITranslation;
    accountDetails: IAccountDetails;
    logger: ILogger;
    contractWeb3Api: ContractWeb3Api;
}

export class Contract extends React.PureComponent<IContractProps> {

    render() {
        let locale = this.props.locale;
        let tr = this.props.translation;
        let account = this.props.accountDetails;

        return account.accountCode ?
            <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForFullView}}>
                <ContractDetails
                    accountDetails={account}
                    translation={tr}
                    locale={locale}
                    logger={this.props.logger}
                    contractWeb3Api={this.props.contractWeb3Api}
                />
            </ResponsiveContainer>
        : null;
    }
}
