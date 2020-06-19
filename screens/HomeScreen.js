import React, { Component, useState, } from 'react';
import { ScrollView } from 'react-native'
import Carousel from '../components/Carousel'
import { dummyData } from '../data/DataCarousel'
import HomeFlatList from '../components/HomeFlatList'

export default function HomeScreen(props) {
  return (
    <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
      <Carousel data={dummyData} />

      <HomeFlatList
        navigation={props.navigation}
        title="Phòng trọ HOT"
      />
    </ScrollView>
  )
}
