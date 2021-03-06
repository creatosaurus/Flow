import React, { useEffect } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import constant from '../constant/constant'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Card3 from '../ReusableComponents/Card3';
import Tabbar from '../ReusableComponents/Tabbar';
import { useSelector } from 'react-redux'


const Playlist = (props) => {

    const songs = useSelector(state => state.songs)

    let songs_category = songs.filter(data => {
        return data.category === props.route.params.category && data.sub_category === props.route.params.sub
    })

    let songId = []
     songId =songs_category.map(data=>{
       return data._id
    })

    return (
        <View style={{ flex: 1, backgroundColor: constant.background }}>
            <View style={{ flexDirection: 'row', height: 60, justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
                <Icon name="keyboard-backspace" color={'white'} size={30} />
                <Icon name="more-vert" color={'white'} size={30} />
            </View>
            <ScrollView>
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }} style={{ width: 200, height: 200, alignSelf: 'center' }}></Image>
                    <Text style={{ color: constant.white, fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>Bollywood Mush</Text>
                    <Text style={{ color: "#828282", opacity: 0.5, alignSelf: 'center' }}>Sub Category</Text>
                </View>
                {
                    songs_category.map(data => {
                        return <Card3 title={data.filename} click={() => props.navigation.navigate('Player',{'id':data._id, 'songsIdList':songId})} key={data._id} />
                    })
                }
            </ScrollView>
            <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
        </View>
    )
}

export default Playlist
