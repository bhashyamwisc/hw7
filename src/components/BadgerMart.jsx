import { Text, View, Button } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";
import { useState, useEffect } from "react";
import CS571 from '@cs571/mobile-client'

export default function BadgerMart(props) {
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [basket, setBasket] = useState({});

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f25/hw7/items", {
            headers: {
                "X-CS571-ID": "bid_6a4777121d3e83df638efab2cc5700a5402cce684e5cd7bb13569a680004c24b"
            }
        })
            .then((res) => res.json())
            .then((data) => setItems(data))
    }, []);

    const currentItem = items[currentIndex];

    const addItem = (itemName, upperLimit) => {
        setBasket(prev => ({
            ...prev,
            [itemName]: Math.min((prev[itemName] || 0) + 1, upperLimit)
        }));
    }

    const removeItem = (itemName) => {
        setBasket(prev => ({
            ...prev,
            [itemName]: Math.max((prev[itemName] || 0) - 1, 0)
        }));
    };

    const totalItems = Object.values(basket).reduce((sum, qty) => sum + qty, 0);
    const totalCost = items.reduce((sum, item) => {
        const qty = basket[item.name] || 0;
        return sum + qty * item.price;
    }, 0);

    const placeOrder = () => {
        Alert.alert(
            "Order Confirmed!",
            `Your order contains ${totalItems} items and costs $${totalCost.toFixed(2)}!`
        );
        setBasket({});
        setCurrentIndex(0);
    };

    return <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Welcome to Badger Mart!</Text>

        {currentItem ? (
            <BadgerSaleItem
                item={currentItem}
                quantity={basket[currentItem.name] || 0}
                addItem={() => addItem(currentItem.name, currentItem.upperLimit)}
                removeItem={() => removeItem(currentItem.name)}
            />
        ) : (
            <Text>Loading item...</Text>
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <Button
                title="Previous"
                onPress={() => setCurrentIndex(prevIndex => prevIndex - 1)}
                disabled={currentIndex === 0}
            />
            <Button
                title="Next"
                onPress={() => setCurrentIndex(prevIndex => prevIndex + 1)}
                disabled={currentIndex === items.length - 1}
            />
        </View>
        <View style={{ marginTop: 30, alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>
                Total Items: {totalItems}
            </Text>
            <Text style={{ fontSize: 18 }}>
                Total Cost: ${totalCost.toFixed(2)}
            </Text>
            <Button
                title="Place Order"
                onPress={placeOrder}
                disabled={totalItems === 0}
            />
        </View>

    </View>
}