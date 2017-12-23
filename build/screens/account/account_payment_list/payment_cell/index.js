import React from 'react';
import { View, Text, TouchableOpacity, Alert, } from 'react-native';
import styles from './styles';
import { PaymentApi } from 'ucshared';
export class PaymentCell extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    deletePayment() {
        Alert.alert('Delete Payment', 'Are you sure you want to delete this payment?', [
            {
                text: 'Delete',
                onPress: () => {
                    const api = new PaymentApi();
                    api.paymentSessionDeletePayment({
                        sessionId: this.props.app.getCurrentUserId(),
                        paymentProfileId: this.props.payment.id || ''
                    }).then(() => {
                        // reload
                        this.props.app.getCurrentUser().then(user => this.props.app.setCurrentUser(user));
                        this.props.app.goBack();
                    });
                },
                style: "destructive"
            },
            {
                text: 'Cancel',
                style: "cancel"
            }
        ]);
    }
    render() {
        let payment = this.props.payment;
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.itemContainer },
                React.createElement(Text, { style: styles.text }, payment.firstName + " " + payment.lastName),
                React.createElement(Text, { style: styles.text },
                    payment.cardType,
                    " ",
                    payment.cardNumber),
                React.createElement(Text, { style: styles.text },
                    "Expires ",
                    payment.expiryMonth,
                    "/",
                    payment.expiryYear)),
            React.createElement(View, { style: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', } },
                React.createElement(View, null),
                React.createElement(TouchableOpacity, { style: styles.btContainer, onPress: this.deletePayment.bind(this) },
                    React.createElement(Text, { style: styles.text1 }, "Delete")))));
    }
}
//# sourceMappingURL=index.js.map