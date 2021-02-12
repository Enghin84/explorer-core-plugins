import * as React from "react";
import { IAccordionItemConfig } from "@alethio/ui/lib/control/accordion/IAccordionItemConfig";
import { ILogger } from "plugin-api/ILogger";
import { ITranslation } from "plugin-api/ITranslation";
import { SourceCodeAsyncRenderer } from "app/shared/component/sourceCode/SourceCodeAsyncRenderer";
import { AccountCodeRenderer } from "app/shared/component/sourceCode/AccountCodeRenderer";
import { ContractAccordion } from "app/shared/component/sourceCode/ContractAccordion";
import { AccordionItem } from "@alethio/ui/lib/control/accordion/AccordionItem";
import { ReadContractSection } from "app/eth-extended/module/account/contract/component/ReadContractSection";
import { ContractAbiFactory } from "app/eth-extended/data/contract/ContractAbiFactory";
import { ContractWeb3Api } from "app/eth-extended/data/contract/ContractWeb3Api";
import { IAccountDetails } from "app/eth-memento/data/account/IAccountDetails";

const ACCORDION_CONTENT_HEIGHT = 500;

interface IContractAccordionItemConfig extends IAccordionItemConfig {
    label: string;
    disabled?: boolean;
}

export interface IContractDetailsProps {
    accountDetails: IAccountDetails;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
    contractWeb3Api: ContractWeb3Api;
}

export class ContractDetails extends React.PureComponent<IContractDetailsProps> {
    render() {
        let { translation: tr, locale, logger, accountDetails } = this.props;
        let accountCode = accountDetails.accountCode ? accountDetails.accountCode : "";
        let sourceCodeAsyncRenderer = new SourceCodeAsyncRenderer(ACCORDION_CONTENT_HEIGHT);
        let contractAbiFactory = new ContractAbiFactory(logger);
        let contractAbi = contractAbiFactory.create(accountDetails.contractAbi);
        let address = accountDetails.address;

        return <ContractAccordion
            contentHeight={ACCORDION_CONTENT_HEIGHT}
            locale={locale}
            translation={tr}
            logger={logger}
        >
            <AccordionItem<IContractAccordionItemConfig>
                label={tr.get("accountView.contract.accountCode.label")}
                disabled={!accountCode}
                content={async () => {
                    return new AccountCodeRenderer(sourceCodeAsyncRenderer).render(async () => accountCode, tr);
                }}
            />
            <AccordionItem<IContractAccordionItemConfig>
                label={tr.get("accountView.contract.read.label")}
                disabled={!contractAbi}
                content={async () => {
                    return <ReadContractSection
                        abi={contractAbi}
                        contractAddress={address}
                        contractWeb3Api={this.props.contractWeb3Api}
                        translation={tr}
                        logger={this.props.logger}
                    />;
                }}
            />
        </ContractAccordion>;
    }
}
