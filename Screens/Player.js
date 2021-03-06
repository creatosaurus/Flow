import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import constant from '../constant/constant'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer from "react-native-track-player";
import Progressbar from '../ReusableComponents/Progressbar';

let i = 0

const Player = (props) => {

  const playbackState = TrackPlayer.usePlaybackState()
  const [slidervalue, setslidervalue] = useState(0)
  const [end, setend] = useState(0)
  const [flag, setflag] = useState(1)


const tp =props.route.params.songsIdList
  const songsId = props.route.params.songsIdList.filter(data => {
    return data != props.route.params.id
  })

  let obj = {
    id: '',
    url: '',
    title: 'Track Title',
    artist: 'Track Artist',
  }

  let listOfSongs = []
  songsId.map(data1 => {
    obj.id = data1;
    obj.url = 'http://192.168.0.103:4000/audio/song/' + data1;
    listOfSongs.push(obj)
  })


  useEffect(() => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ]
    });
    resetPlayer()
    togglePlayback()

  }, []);

  const resetPlayer = async () => {
    await TrackPlayer.reset();
  }



  const togglePlayback = async () => {

    if (getStateName(playbackState) != "Playing") {
      try {
        await TrackPlayer.add({
          id: '123',
          url: 'http://192.168.0.103:4000/audio/song/' + props.route.params.id,
          title: 'Track Title',
          artist: 'Track Artist',
          //artwork: require('track.png')
        })
      } catch (error) {
        console.log(error)
      }


      try {
        await TrackPlayer.add(listOfSongs);
      } catch (error) {
        alert(error)
      }


      try {
        await TrackPlayer.play();
      } catch (error) {
        alert(error)
      }


    } else {

      try {
        await TrackPlayer.pause();
      } catch (error) {
        alert(error)
      }

    }
  }


  const goto = (data) => {
    TrackPlayer.seekTo(data);
    setslidervalue(data)
  }


  const ProgressBar = () => {
    const { position, bufferedPosition, duration } = TrackPlayer.useTrackPlayerProgress()

    if (position != 0) {
      i = position
    }

    if (flag === 1 && duration != 0) {
      setend(duration)
      setflag(0)
    }



    if (getStateName(playbackState) === "Paused") {
      return <Progressbar position={i} duration={end} goto={goto} />
    }
    if (getStateName(playbackState) === "Buffering" || position === 0) {
      return <Progressbar position={slidervalue} duration={end} goto={goto} />
    } else {
      return <Progressbar position={position} duration={duration} goto={goto} />
    }
  }







  const nextSong = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      togglePlayback()
    }
  }

  const previousSong = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
     togglePlayback()
    }
  }




  return (

    <LinearGradient colors={['#4c669f', constant.background]} style={{ flex: 1 }}>
      <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: constant.white }}>From Flow</Text>
        <Text style={{ color: '#dcdcdc', opacity: 0.5 }}>hi</Text>
      </View>
      <Image source={{ uri: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }} style={{ width: '90%', height: '50%', alignSelf: 'center', marginTop: 40 }}></Image>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: constant.white, fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Chal Kahi Aur</Text>
      </View>

      <ProgressBar />

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
        <Icon name="repeat" color={'white'} size={30} />
        <Icon name="fast-rewind" color={'white'} size={35} onPress={() => previousSong()} />
        <View style={{ height: 50, width: 50, borderRadius: 40, backgroundColor: 'white',elevation:5, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name={getStateName(playbackState) != "Playing" ? "play-arrow" : "pause"} color={'black'} size={35} onPress={togglePlayback} />
        </View>
        <Icon name="fast-forward" color={'white'} size={35} onPress={() => nextSong()} />
        <Icon name="shuffle" color={'white'} size={30} />
      </View>
    </LinearGradient>

  )
}


function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return "None";
    case TrackPlayer.STATE_PLAYING:
      return "Playing";
    case TrackPlayer.STATE_PAUSED:
      return "Paused";
    case TrackPlayer.STATE_STOPPED:
      return "Stopped";
    case TrackPlayer.STATE_BUFFERING:
      return "Buffering";
  }
}



export default Player
