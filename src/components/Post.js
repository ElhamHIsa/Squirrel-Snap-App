// components/Post.js
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const Post = ({ imageUri, description }) => {
  return (
    <View style={styles.post}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: { marginBottom: 20 },
  image: { width: "100%", height: 200 },
});

export default Post;
