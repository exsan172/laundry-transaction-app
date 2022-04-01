import React from "react"
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import { useRecoilState } from 'recoil'
import { modalSettings } from '../store'

const ModalsSettings = () => {
    const [showSettings, setShowSettings] = useRecoilState(modalSettings)

    return (
        <Modal isVisible={showSettings} animationInTiming={500} animationOutTiming={600}  backdropOpacity={0.4}>
            <View style={{backgroundColor:"#ffffff", padding:10, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:300}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                            <Icon name="cog" size={20}/>
                            <Text style={{fontWeight:'bold', fontSize:17, marginHorizontal:5}}>Settings</Text>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text>jancok</Text>
                    <TouchableOpacity onPress={() => setShowSettings(false)}>
                        <Text>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalsSettings