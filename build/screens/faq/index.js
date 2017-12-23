import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { CommonHeading } from "../../components/heading";
import { RouteMap } from "../../routemap";
import styles from './styles';
export class FAQ extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    onBack() {
        let route = RouteMap.Home;
        if (!this.props.navigator) {
            alert('Can\'t go back');
            return;
        }
        this.props.navigator.pop();
    }
    renderFaq() {
        return React.createElement(ScrollView, { style: styles.container },
            React.createElement(CommonHeading, { title: 'Frequently Asked Questions', onBack: this.onBack.bind(this) }),
            React.createElement(View, { style: styles.content },
                React.createElement(Text, { style: styles.header }, "How do upgrades work?"),
                React.createElement(Text, { style: styles.blurb }, "Every bottle of wine you order is eligible to be randomly swapped-out to a higher-priced, rare-vintage, or large-format bottle. The bottles are chosen randomly at checkout, and you find out which bottles you will receive after you complete your order."),
                React.createElement(Text, { style: styles.blurb }, "The bottles you buy and your upgrades are transferred to your CloudCellar as soon as possible after purchase.")),
            React.createElement(View, { style: styles.content },
                React.createElement(Text, { style: styles.header }, "What is CloudCellar?"),
                React.createElement(Text, { style: styles.blurb }, "CloudCellar is your own personal wine collection in the cloud. We store the actual bottles you buy in ideal temperature and humidity-controlled conditions at our earthquake-proof facility in California Wine Country! With CloudCellar, you can:"),
                React.createElement(Text, { style: styles.blurbList }, "Collect and store up to 500 bottles for as long as you want, without paying storage fees."),
                React.createElement(Text, { style: styles.blurbList }, "Mix and match bottles from different purchases so you can save on shipping fees (12 bottles ship FREE)"),
                React.createElement(Text, { style: styles.blurbList }, "Ship your wine when and where you want it."),
                React.createElement(Text, { style: styles.blurbList }, "Collect and store up to 500 bottles for as long as you want, without paying storage fees."),
                React.createElement(Text, { style: styles.blurb }, "Going on vacation? Have your wine waiting for you when you arrive? Need the perfect gift? Have that special bottle sent to your recipient of choice with a complimentary gift message included in the box!"),
                React.createElement(Text, { style: styles.blurb }, "Out of space? Don't have a wine cellar at home? Let us handle the storage requirements for you.")),
            React.createElement(View, { style: styles.content },
                React.createElement(Text, { style: styles.header }, "How much does shipping cost?"),
                React.createElement(Text, { style: styles.blurb }, "You can ship any 12 bottles for FREE, or any 6 bottles for just $5.")),
            React.createElement(View, { style: styles.content },
                React.createElement(Text, { style: styles.header }, "I bought 12 bottles but not all of them are ready to ship. Can I ship part of my order now and part later?"),
                React.createElement(Text, { style: styles.blurb }, "Of course! Since you have 6 bottles available already, you can ship any 6 for just $5 and then when the other 6 are in you can ship them later. Or you can wait for all 12 to be Ready to Ship and ship them together for free!")),
            React.createElement(View, { style: styles.content },
                React.createElement(Text, { style: styles.header }, "Is tax included in the purchase price?"),
                React.createElement(Text, { style: styles.blurb }, "Tax isn't included in the purchase price. Tax will be added for states where the winery collects and reports taxes. If you are shipping to a state where the winery does not collect tax, you may still be required to report and pay any applicable taxes on your own. Tax is remitted to the state you ship your wine to. When you purchase wine to be delivered to your CloudCellar, we collect a fee which is equal to the amount of tax we expect will be due on your shipment. When you later ship your bottles from the CloudCellar, we'll refund that fee if less tax is due, or charge you the difference so that you pay the actual tax due. The details of this are itemized for your convenience at Checkout.")),
            React.createElement(View, { style: styles.content },
                React.createElement(Text, { style: styles.header }, "How long will my wine take to receive?"),
                React.createElement(Text, { style: styles.blurb }, "Generally wine you buy from us is delivered to the CloudCellar within 3-6 weeks. It takes this long because we always try to get the highest quality wine straight from the winery, where they have been storing and aging it in the conditions they specify. What this means is the wine you are getting from us is the freshest, highest quality, and best tasting wine possible! We think it's worth the wait, and we hope you agree :)"),
                React.createElement(Text, { style: styles.blurb }, "While we are waiting for your bottles to arrive, they will be showing as \"En route\" to your CloudCellar. After the wine arrives it will move to the \"Ready to Ship\" section."),
                React.createElement(Text, { style: styles.blurb }, "Bottles that are \"Ready to Ship\" can be requested by you for shipment at any time. Shipment requests are processed in 1-2 business days (Monday-Friday). Orders placed by 7 AM Pacific Time Monday-Friday usually go out that day."),
                React.createElement(Text, { style: styles.blurb }, "We offer complimentary ground shipping when shipping a case of 12 bottles. We offer expedited delivery options at a slight premium. To view the shipping options available and schedule your shipment follow these steps:"),
                React.createElement(Text, { style: styles.blurbList }, "1) Log into your account at www.undergroundcellar.com"),
                React.createElement(Text, { style: styles.blurbList }, "2) Click on \u201CCloudCellar\u201D in the top navigation menu"),
                React.createElement(Text, { style: styles.blurbList }, "3) Press the \u201CAdd to Shipment\u201D button underneath each wine you\u2019d like to ship \u2013-be sure to click it multiple times to add more of the same wine to your shipment"),
                React.createElement(Text, { style: styles.blurbList }, "4) Click the blue \u201CShip my bottles\u201D button"),
                React.createElement(Text, { style: styles.blurbList }, "5) Enter your desired shipping address"),
                React.createElement(Text, { style: styles.blurbList }, "6) View available shipping methods and rates"),
                React.createElement(Text, { style: styles.blurbList }, "7) Complete your shipment checkout!"),
                React.createElement(Text, { style: styles.blurb }, "Please note that a shipment can contain a maximum of 12 bottles. After shipping your first case, if you still have bottles remaining in your CloudCellar you can schedule another shipment for those as well!"),
                React.createElement(View, { style: styles.content },
                    React.createElement(Text, { style: styles.header }, "What if I receive a defective/corked/broken bottle?"),
                    React.createElement(Text, { style: styles.blurb }, "Your satisfaction is our priority. Please see our Returns and Refunds page for more information.")),
                React.createElement(View, { style: styles.content },
                    React.createElement(Text, { style: styles.header }, "You do not ship to my state/country. What are my options? Do you ship to Canada?"),
                    React.createElement(Text, { style: styles.blurb }, "While we cannot make exceptions to state shipping restrictions, some customers choose to ship their wine to a trusted friend or relative who lives in a state that we do ship to. These customers may or may not bring the alcohol back to their own home state, depending upon local laws and regulations."),
                    React.createElement(Text, { style: styles.blurb }, "You can also ship the wine to a UPS or FedEx location in a state that we do ship to. If you choose to do this, be sure to contact the UPS or FedEx location to make sure they will hold your package for you. Then you can track the package online and when it's delivered, you can pick it up and bring it back to your home state. Check with your home state for laws regarding the personal importation of wine.")),
                React.createElement(View, { style: styles.content },
                    React.createElement(Text, { style: styles.header }, "Does someone have to be home to sign for the package?"),
                    React.createElement(Text, { style: styles.blurb }, "Yes, wine regulations in all states require the signature of an adult age 21 or older in order to receive our shipments. Photo ID may be required at the time delivery."),
                    React.createElement(Text, { style: styles.blurb }, "If you cannot be home, we can have your wine delivered and held at a nearby UPS or FedEx location and you can pick up your wine during their business hours. You can also use the UPS MyChoice service to schedule delivery to a 1-hour window (UPS fees may apply)."),
                    React.createElement(Text, { style: styles.blurb }, "Also, some customers choose to have their wine shipped to their work address (check with your employer if this is okay first!).")),
                React.createElement(View, { style: styles.content },
                    React.createElement(Text, { style: styles.header }, "What if I miss my delivery?"),
                    React.createElement(Text, { style: styles.blurb }, "We will email you a tracking number the evening your order is shipped out. We recommend that you use the tracking services offered by the shipping carrier to determine the estimated delivery date your package will arrive."),
                    React.createElement(Text, { style: styles.blurb }, "If nobody age 21 or older is available to sign for the package, the driver will not leave the shipment unattended. Generally, two additional delivery attempts will be made. After that, the wine gets returned to the CloudCellar. Contact us to arrange re-shipment."),
                    React.createElement(Text, { style: styles.blurb }, "Please note that promotional shipping prices (e.g. free shipping on 12 bottles) only applies to the first time wine is shipped. Re-shipments are charged at the actual shipping fees charged to us by the shipping carrier, which is usually about $40 for a case of wine. So make sure you are home!")),
                React.createElement(View, { style: styles.content },
                    React.createElement(Text, { style: styles.header }, "Is my payment information safe?"),
                    React.createElement(Text, { style: styles.blurb }, "Yes! We take security around here very seriously, and we have never had a breach. We don't store credit card numbers. Instead, we request a secure \"token\" from your bank which can only be used by us to charge your credit card per your future requests.")),
                React.createElement(View, { style: styles.content },
                    React.createElement(Text, { style: styles.header }, "Still have questions? Contact Us!"),
                    React.createElement(Text, { style: styles.blurb }, "We typically respond to email inquiries within 1 business day. Email support@undergroundcellar.com"),
                    React.createElement(Text, { style: styles.blurb }, "By Phone: (888) 977-9899. Please note, we receive a lot of phone calls and voicemails. Email support for the fastest response."),
                    React.createElement(Text, { style: styles.blurb }, "When contacting us, be sure to include information such as your order number so we can best assist you."),
                    React.createElement(Text, { style: styles.blurb }, "Our mailing address:"),
                    React.createElement(Text, { style: styles.blurbGroup }, "Underground Cellar"),
                    React.createElement(Text, { style: styles.blurbGroup }, "425 Market Street, Suite 2200"),
                    React.createElement(Text, { style: styles.blurbGroup }, "San Francisco, CA 94105"))));
    }
    render() {
        return this.renderFaq();
    }
}
//# sourceMappingURL=index.js.map