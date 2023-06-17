/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

async function handleFileSubmit(fileResponseObject: ImagePickerResponse) {
  console.log('begin to submit');
  console.log(
    'fileName:',
    fileResponseObject.assets![0].fileName,
    '\n uri:',
    fileResponseObject.assets![0].uri,
  );

  const data = new FormData();

  data.append('file', {
    name: fileResponseObject.assets![0].fileName,
    type: fileResponseObject.assets![0].type,
    uri: fileResponseObject.assets![0].uri,
  });

  try {
    const fetchResult = await fetch('http://10.0.2.2:8080/upload', {
      method: 'POST',
      body: data,
    });
    console.log(fetchResult);
  } catch (e) {
    console.error(e);
  }
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
  };

  const handleCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});

    // begin submit to server
    handleFileSubmit(result);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Camera">
            <Button title="Open Camera" onPress={handleCamera}></Button>
          </Section>
          <Section title="Image Picker">
            <Button title="Pick Media" onPress={handleImagePicker}></Button>
          </Section>

          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
