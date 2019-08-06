import { IModuleDef } from "plugin-api/IModuleDef";
import { ITxBasicProps, TxBasic } from "./TxBasic";
import { ITxContext } from "app/shared/context/ITxContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { txContextType } from "app/shared/context/txContextType";

enum SlotType {
    BlockConfirmations = "blockConfirmations"
}

export const txBasicModule: (ethSymbol: string) => IModuleDef<ITxBasicProps, ITxContext, SlotType> =
(ethSymbol) => ({
    contextType: txContextType,
    slotNames: Object.values(SlotType),

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsExtended
    }, {
        ref: AlethioAdapterType.EthPrices,
        optional: true
    }],

    getContentComponent: async () => TxBasic,

    getContentProps(data) {
        let { asyncData, context, translation, locale, slots } = data;

        let txDetails = asyncData.get(AlethioAdapterType.TxDetailsExtended)!.data as ITxDetails;
        let latestEthPrice = asyncData.get(AlethioAdapterType.EthPrices)!.data as number | undefined;

        let props: ITxBasicProps = {
            txHash: context.txHash,
            txDetails,
            latestEthPrice,
            locale,
            ethSymbol,
            translation,
            blockConfirmationsSlot: slots && slots[SlotType.BlockConfirmations]
        };
        return props;
    },

    getHelpComponent: () => ({ translation }) => translation.get("txView.content.basic.help") as any
});
