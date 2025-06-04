import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Send, Bot } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function HelpScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis Dropi, votre assistant DropiGo. Comment puis-je vous aider ?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newUserMessage]);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "Je n'ai pas de réponse à cette question pour le moment. Veuillez contacter notre service client pour plus d'informations.";
      
      if (message.toLowerCase().includes('livraison') || message.toLowerCase().includes('délai')) {
        botResponse = "Les délais de livraison dépendent de la distance et du type de transport. En général, les livraisons locales prennent 24h et les livraisons inter-wilaya entre 48h et 72h.";
      } else if (message.toLowerCase().includes('paiement') || message.toLowerCase().includes('prix')) {
        botResponse = "Nous acceptons les paiements par carte Edahabia et carte CIB. Les prix sont calculés en fonction du volume, du poids et de la distance de livraison.";
      } else if (message.toLowerCase().includes('compte') || message.toLowerCase().includes('inscription')) {
        botResponse = "Pour créer un compte, cliquez sur 'S'inscrire' depuis l'écran d'accueil. Vous pouvez choisir entre un compte particulier ou un compte professionnel.";
      }
      
      const newBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color={Colors.text.DEFAULT} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Aide</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.chatHeader}>
        <View style={styles.botIconContainer}>
          <Bot size={24} color={Colors.text.DEFAULT} />
        </View>
        <View>
          <Text style={styles.chatHeaderTitle}>Dropi</Text>
          <Text style={styles.chatHeaderSubtitle}>Assistant DropiGo</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.isUser ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.messageTime}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tapez votre message..."
          placeholderTextColor={Colors.text.tertiary}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} color={Colors.background.DEFAULT} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.DEFAULT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.md,
  },
  backButton: {
    padding: Layout.spacing.xs,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Colors.text.DEFAULT,
    letterSpacing: 1,
  },
  placeholder: {
    width: 28,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background[100],
  },
  botIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  chatHeaderTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.text.DEFAULT,
  },
  chatHeaderSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: Layout.spacing.md,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  userMessage: {
    backgroundColor: Colors.primary.DEFAULT,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  botMessage: {
    backgroundColor: Colors.background[100],
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.DEFAULT,
    marginBottom: Layout.spacing.xs,
  },
  messageTime: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: Colors.text.secondary,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.background[100],
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background[100],
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    fontSize: 14,
    color: Colors.text.DEFAULT,
    fontFamily: 'Poppins-Regular',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.md,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.primary[800],
    opacity: 0.6,
  },
});