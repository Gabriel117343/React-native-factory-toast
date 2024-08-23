# react-native-factory-toast

![npm version](https://img.shields.io/npm/v/react-native-factory-toast.svg?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/react-native-factory-toast.svg?style=flat-square)
![License](https://img.shields.io/npm/l/react-native-factory-toast.svg?style=flat-square)
![Build Status](https://img.shields.io/github/actions/workflow/status/Gabriel117343/React-native-factory-toast/main.yml?style=flat-square)
![Platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-blue.svg?style=flat-square)
![Issues](https://img.shields.io/github/issues/Gabriel117343/React-native-factory-toast?style=flat-square)
![Expo](https://img.shields.io/badge/Expo-compatible-orange.svg?style=flat-square)


**Versión:** `v1.8.8`
## Descripción

**🏭react-native-factory-toast**  is a Toast notification library for React Native applications. It provides an easy and customizable way to display brief, non-intrusive messages in your app. The library supports various types of messages, such as errors and successes, with simple customization options to fit your app's design.

## Features

- **🎉Toast Notifications**: Display messages on the screen in a non-intrusive way.
- **Toast Types**: Supports notification types, such as errors and success.
- **Flexible Configuration**: Customize the colors, size, and styles of the toasts.
- **Easy Integration**: Install and use in your project with ease.
- **Contexto Global con Zustand🌐**: Use Zustand to manage the global state of the toasts!.
- **Animations with react-native-reanimated**: Integrate smooth animations for a better user experience.
- **Multiple Toast Themes🌙**: Supports differents toast themes, including dark mode and custom styles.

## Installation

To install the library, run the following command:

```bash
npm install react-native-factory-toast
```

> Ejemplo de Uso

2. **Configurar el Toast Provider (Toaster):**

   make sure to add the `Toaster` at the entry point of your application so that toast can be rendered there:
    ```jsx
    import React from 'react';
    import { View, Text } from 'react-native';
    
    import { Toaster } from 'react-native-factory-toast'; // Ensure you import the Toaster component
    
    const App = () => (
    
        <View style={{ flex: 1 }}>
          <Toaster /> {/* Add the Toaster at the top of your app */}
          <Text>My App</Text>
          {/* Other components */}
          <Toaster /> {/* Add the Toaster at the top of your app */}
        </View>
    
    );
    
    export default App;
    ```
3. **Display a Toast:**

  Use the methods toast.success, toast.error, toast.info, toast.warning, and toast.loading to display toasts from anywhere in your application.
  
  These methods allow you to show messages with different types of notifications and customizable settings.
  Below is an example:
   ```jsx
    import React from 'react';
    import { Button, View } from 'react-native';
    import { toast } from 'react-native-factory-toast';
    
    const ExampleComponent = () => {
      const showSuccessToast = () => {
        toast.success('Operation completed successfully.', {
          title: 'Success', // Toast title (optional)
          position: 'top-right', // Toast position (optional)
          duration: 4000, // Toast duration in milliseconds (optional)
          progress: true, // Show progress indicator (optional)
          border: true, // Show a border around the toast (optional)
          styles: {
            backgroundColor: '#28a745', // Custom background color
            borderColor: '#155724', // Custom border color
            titleColor: '#fff', // Custom title color
            textColor: '#ddd', // Custom text color
            progressColor: '#ffc107', // Custom progress indicator color
          },
        });
      };
      toast.success("Thanks for visiting us!", { toastStyle: 'dark', icon: '🚀'})
    
      const showErrorToast = () => {
        toast.error('There was a problem with the operation.', {
          title: 'Error',
          position: 'center',
          duration: 2500,
          icon: '🚫', // Custom icon (emoji)
          styles: {
            backgroundColor: '#dc3545', // Custom background color
            borderColor: '#721c24', // Custom border color
            titleColor: '#fff', // Custom title color
            textColor: '#f8d7da', // Custom text color
          },
        });
      };
    
      // Real-world example
      const sendData = () => {
        toast.loading("Loading...", {
          id: "loadData",
          duration: 2000,
          position: top, // Persistent state if loading changes to success
          toastStyle: "dark", // This prop is also persistent
          icon: '⏳', // Custom icon (emoji)
        });
        try {
          const { success, message } = axios.post('https://....');
          if (success) { 
            toast.info(message, { id: 'loadData', title: 'Success!' }); // Inherits position and toastStyle
          } else {
            // toast ...
          }
        } catch(error) {
            // toast ...
        }
      };
      
      return (
        <View>
          <Button title="Show Success" onPress={showSuccessToast} />
          <Button title="Show Error" onPress={showErrorToast} />
        </View>
      );
    };
    
    export default ExampleComponent;

  ```
### Prop Properties

| **Property**         | **Type**                                                      | **Description**                                                                                          |
|----------------------|---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `id`                 | `number` _(optional)_                                         | Unique identifier for the toast.                                                                         |
| `title`              | `string` _(optional)_                                         | Title of the toast.                                                                                      |
| `duration`           | `number` _(optional)_                                         | Duration of the toast in milliseconds.                                                                   |
| `position`           | `'top' - 'bottom' - 'center' - 'top-left' - 'top-right' - 'bottom-left' - 'bottom-right'` _(optional)_ | Screen position where the toast will appear.                                                             |
| `toastStyle`         | `'primary' - 'secondary' - 'primaryDark' - 'dark'` _(optional)_ | Style of the toast.                                                                                      |
| `animationType`      | `'fade' - 'slide' - 'bounce'` _(optional)_                    | Type of toast animation.                                                                                 |
| `animationInDuration`  | `number` _(optional)_                                       | Duration of the animation in milliseconds.                                                               |
| `animationOutDuration` | `number` _(optional)_                                       | Duration of the animation in milliseconds.                                                               |
| `progress`           | `boolean` _(optional)_                                        | Indicates if the progress bar is displayed.                                                              |
| `icon`               | `string` _(optional)_                                         | Emoji or character to display as an icon in the toast.                                                   |
| `border`             | `boolean` _(optional)_                                        | Indicates if a border is displayed around the toast.                                                     |
| `inheritStyles`      | `boolean` _(optional)_                                        | Indicates if styles from the toast with the same id are inherited.                                       |

### Custom Style Properties

| **Property**        | **Type**                                                         | **Description**                                                                             |
|---------------------|------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| `titleColor`        | `string` _(optional)_                                            | Color of the toast title.                                                                   |
| `textColor`         | `string` _(optional)_                                            | Color of the toast text.                                                                    |
| `titleSize`         | `number` _(optional)_                                            | Font size of the toast title.                                                               |
| `textSize`          | `number` _(optional)_                                            | Font size of the toast text.                                                                |
| `backgroundColor`   | `string` _(optional)_                                            | Background color of the toast.                                                              |
| `borderRadius`      | `number` _(optional)_                                            | Border radius of the toast corners.                                                         |
| `borderColor`       | `string` _(optional)_                                            | Border color of the toast.                                                                  |
| `iconSize`          | `number` _(optional)_                                            | Size of the icon within the toast.                                                          |
| `iconStyle`         | `'solid' - 'outline' - 'default'` _(optional)_                   | Style of the icon in the toast.                                                             |
| `loadingColor`      | `string` _(optional)_                                            | Color of the loading indicator if a loading toast is shown.                                 |
| `progressColor`     | `string` _(optional)_                                            | Color of the toast progress bar.                                                            |
| `width`             | `number` _(optional)_                                            | Custom width of the toast.                                                                  |
| `height`            | `number` _(optional)_                                            | Custom height of the toast.                                                                 |
| `top`               | `number` _(optional)_                                            | Custom top position of the toast on the screen.                                             |
| `bottom`            | `number` _(optional)_                                            | Custom bottom position of the toast on the screen.                                          |
| `left`              | `number` _(optional)_                                            | Custom left position of the toast on the screen.                                            |
| `right`             | `number` _(optional)_                                            | Custom right position of the toast on the screen.                                           |


<img src="https://github.com/user-attachments/assets/e0d00a53-5e7d-4a41-872d-509413e347f7" alt="NASA Image 1" width="25%" />
