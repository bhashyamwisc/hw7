import { Text, View, Image, Button } from "react-native";

export default function BadgerSaleItem({ item, quantity, addItem, removeItem }) {

    return <View style={{ margin: 10, alignItems: "center", borderWidth: 1, padding: 10 }}>
        <Image source={{ uri: item.imgSrc }} style={{ width: 80, height: 80 }} />
        <Text>{item.name}</Text>
        <Text>Price: ${item.price.toFixed(2)}</Text>
        <Text>Available: {item.upperLimit}</Text>
        <Text>In Basket: {quantity}</Text>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Button title="-" onPress={removeItem} disabled={quantity === 0} />
            <View style={{ width: 20 }} />
            <Button title="+" onPress={addItem} disabled={quantity === item.upperLimit} />
        </View>
    </View>
}
