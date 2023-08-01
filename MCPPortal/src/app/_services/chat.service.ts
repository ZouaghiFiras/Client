import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {findBestMatch} from 'string-similarity';

export class Message {
  constructor(public author: string, public content: string) {}
}
@Injectable()
export class ChatService {
  constructor() {}
  conversation = new Subject<Message[]>();
  messageMap = {
    HI: 'Hello',
    'WHO ARE YOU': 'My name is CEDric The CED\'s company Bot',
    'WHAT IS YOUR ROLE': 'Just guide for the user',
    'IN WHICH COUNTRIES ARE YOU PROVIDING SERVICES?': 'We provide expert services and tech-enabled solutions in four main European countries: The Netherlands, France, Belgium, and Spain. We also have offices in eight additional countries to perform our cross-border claims business.',
    'WHAT ARE YOUR LOCATIONS IN THE NETHERLANDS?': 'Our location in the Netherlands is at Rietbaan 40-42, 2908 LP Capelle aan den IJssel. You can find customer contact details on our website.',
    'WHAT ARE YOUR LOCATIONS IN FRANCE?': 'Our location in France is at Immeuble ARIANE (5th floor), 2 rue Jacques Daguerre, F – 92500 RUEIL-MALMAISON. You can contact us at +33 1 55 47 12 80.',
    'WHAT ARE YOUR LOCATIONS IN BELGIUM?': 'Our location in Belgium is at Medialaan 32 bus 4, B-1800 Vilvoorde. You can find customer contact details on our website.',
    'WHAT ARE YOUR LOCATIONS IN SPAIN?': 'Our location in Spain is at Camino Fuente de la Mora 9, 3ª planta 28050 Madrid. You can contact us at +34 90 215 49 62.',
    'WHAT SERVICES DO YOU OFFER AT YOUR LOCATIONS?': 'At our locations, we offer various services including assistance services, claims handling services and software, claims loss adjustment services, and repair services. You can find more information on our website.',
    'WHAT SERVICES DO YOU PROVIDE?': 'We help our clients manage their claims or large calamities by providing expert services and tech-enabled solutions.',
    'WHAT ASSISTANCE SERVICES DO YOU OFFER?': 'We offer breakdown assistance, lease car assistance, assistance when damage occurs to vehicles, and help in case of injury abroad through SOS International.',
    'WHAT IS CED CONNECT?': 'CED Connect is an advanced and widely used digital damage platform. It aims to prevent damage as much as possible and preserve and increase the value of ownership, mobility, and vitality.',
    'WHAT CLAIMS HANDLING SERVICES DO YOU PROVIDE?': 'We are the service provider behind many insurers, real estate companies, housing corporations, leasing companies, healthcare providers, large corporations, and governments. We also offer cross-border claims management services with our European offices and international partners.',
    'WHAT CLAIMS LOSS ADJUSTMENT SERVICES DO YOU OFFER?': 'We provide claims loss adjustment services for property, mobility, and vitality-related events, efficiently and with empathy.',
    'WHAT REPAIR SERVICES DO YOU OFFER?': 'We have a national network of repair and maintenance companies, and we offer repair coordination services as well as an innovative maintenance and repair platform for leakages, break-ins, and fires.',
    'WHAT DIGITAL ASSETS DO YOU HAVE?': 'We have a Client Portal (MCP) and Claims Insight, which are part of our technology offerings.',
    'IN WHICH COUNTRIES ARE YOU OPERATIVE?': 'We are operative in four core countries: Netherlands, France, Belgium, and Spain, with offices in eight additional countries.',
    'WHEN WERE YOU CREATED AND BY WHOM?': 'We were created in 1971 by our clients. Co-creation of claim services and solutions with them is in our DNA.',
    'WHAT IS YOUR VISION?': 'Our vision is to think like our clients, aiming at innovation, cost containment and efficiency, speed, and end-customer satisfaction. We care for people and focus on creating unmatched claim experiences.',
    'HOW DO YOU DIFFERENTIATE YOURSELVES?': 'We differentiate ourselves through innovation and technology. Every year, we invest more than 5% of our turnover in digital and intelligence solutions to empower our customers and experts. We own industry-leading digital assets.',
    'WHAT IS EASYSINISTRE?': 'Easysinistre is a solution for estimating property and furniture damage to increase the rate of mutual agreement. It provides a simple and ergonomic interface and is fully automatic.',
    'WHAT IS OUISCAN?': 'OuiScan is a product of CED-Eurexo and provides remote diagnostic solutions for large-scale events.',
    'CAN YOU PROVIDE MORE INFORMATION ABOUT CED CONNECT?': 'Certainly! CED Connect is an advanced and widely used digital damage platform. It aims to prevent damage as much as possible and preserve and increase the value of ownership, mobility, and vitality. It is a comprehensive solution that combines technology and expertise to deliver optimal results.',
    'WHAT ARE THE DIGITAL ASSETS OFFERED BY CEDRIC?': 'CEDric offers two main digital assets - the Client Portal (MCP) and Claims Insight. The Client Portal provides clients with access to their claim information, documents, and updates, while Claims Insight offers valuable insights and analytics related to claims management.',
    'HOW DOES CEDRIC DIFFERENTIATE ITSELF FROM OTHERS?': 'CEDric differentiates itself through innovation and technology. The company invests heavily in digital and intelligence solutions, allocating more than 5% of its turnover each year. This empowers customers and experts and enables industry-leading digital experiences.',
    'TELL ME MORE ABOUT EASYSINISTRE.': 'Easysinistre is a solution developed by CEDric to estimate property and furniture damage. Its primary goal is to increase the rate of mutual agreement between parties involved in a claim. Easysinistre provides a simple and ergonomic interface and utilizes automation to streamline the estimation process.',
    'WHAT IS OUISCAN USED FOR?': 'OuiScan, a product of CED-Eurexo, offers remote diagnostic solutions for large-scale events. It leverages advanced technology to assess damages and facilitate efficient claim handling.',
    'WHAT ARE YOUR LOCATIONS IN EUROPE?': 'Apart from the core countries of the Netherlands, France, Belgium, and Spain, we have offices in eight additional countries across Europe. These offices enable us to perform cross-border claims business and serve our international clients.',
    'WHAT ARE YOUR CONTACT DETAILS IN THE NETHERLANDS?': 'You can find our location in the Netherlands at Rietbaan 40-42, 2908 LP Capelle aan den IJssel. For customer contact details, please visit our website.',
    'WHAT ARE YOUR CONTACT DETAILS IN FRANCE?': 'We are located at Immeuble ARIANE (5th floor), 2 rue Jacques Daguerre, F – 92500 RUEIL-MALMAISON in France. You can reach us at +33 1 55 47 12 80.',
    'WHAT ARE YOUR CONTACT DETAILS IN BELGIUM?': 'Our office in Belgium is located at Medialaan 32 bus 4, B-1800 Vilvoorde. You can find customer contact details on our website.',
    'WHAT ARE YOUR CONTACT DETAILS IN SPAIN?': 'We are situated at Camino Fuente de la Mora 9, 3ª planta 28050 Madrid in Spain. For any inquiries, please contact us at +34 90 215 49 62.',
    'WHAT OTHER SERVICES DO YOU OFFER BESIDES CLAIMS HANDLING?': 'In addition to claims handling, we offer assistance services such as breakdown assistance, lease car assistance, and support in case of damage to vehicles. We also provide injury abroad assistance through SOS International.',
    'WHAT ARE YOUR CLAIMS LOSS ADJUSTMENT SERVICES?': 'Our claims loss adjustment services cover various events related to property, mobility, and vitality. We strive to handle claims efficiently and with empathy, ensuring fair and timely resolutions.',
    'TELL ME MORE ABOUT YOUR REPAIR SERVICES.': 'We have a nationwide network of repair and maintenance companies to cater to various repair needs. Along with repair coordination services, we offer an innovative maintenance and repair platform for handling leakages, break-ins, and fire-related incidents.',
    'HOW CAN I ACCESS CED CONNECT?': 'CED Connect can be accessed through our website. You can find more information and access details by visiting our platform and exploring the features it offers.',
    'WHAT ARE THE ASSISTANCE SERVICES PROVIDED BY CEDRIC?': 'CEDric offers a range of assistance services, including breakdown assistance for vehicles, lease car assistance, and support when damage occurs. Additionally, we provide assistance in case of injury abroad through our collaboration with SOS International.',
    'WHAT IS THE VISION OF CEDRIC?': 'The vision of CEDric is to align with clients\' needs and prioritize innovation, cost containment, efficiency, speed, and end-customer satisfaction. We aim to create unparalleled claim experiences and prioritize the well-being of individuals.',
    'WHERE CAN I FIND CUSTOMER CONTACT DETAILS?': 'You can find customer contact details on our website. Visit the "Contact" section, and you will find the relevant information to reach out to us.',
    'HOW LONG HAS CEDRIC BEEN IN OPERATION?': 'CEDric was established in 1971 through co-creation with our clients. Our collaborative approach and dedication to claim services and solutions have been ingrained in our DNA ever since.',
    'WHAT MAKES CEDRIC UNIQUE?': 'CEDric stands out through its commitment to innovation and technology. With significant investments in digital and intelligence solutions, we empower our customers and experts while offering industry-leading digital assets.',
    'WHAT IS THE PURPOSE OF CED CONNECT?': 'CED Connect serves as a comprehensive digital damage platform that aims to prevent damage, preserve ownership value, and enhance mobility and vitality. It combines technology and expertise to deliver optimal outcomes for our clients.',
    'WHAT ARE YOUR SERVICES FOR CROSS-BORDER CLAIMS MANAGEMENT?': 'We offer cross-border claims management services through our European offices and international partners. This allows us to efficiently handle claims across different countries, providing seamless solutions for our clients.',
    'TELL ME MORE ABOUT CLAIMS INSIGHT.': 'Claims Insight is one of our digital assets. It provides valuable insights and analytics related to claims management. Through Claims Insight, clients can access data-driven information that helps them make informed decisions and optimize their claims processes.',
    DEFAULT_MSG: 'I can\'t understand your text. Can you please repeat?',
  };


  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);

    const botMessage = new Message('bot', this.getBotMessage(msg.toUpperCase()));
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question: string) {
    const entries = Object.entries(this.messageMap);
    const upperCaseQuestion = question.toUpperCase();

    // Check for exact matches in keys and values
    for (const [key, value] of entries) {
      if (key.toUpperCase() === upperCaseQuestion || value.toUpperCase() === upperCaseQuestion) {
        return value;
      }
    }

    // Check for partial matches in keys and values using string similarity
    const partialMatches = entries.filter(([key, value]) => {
      const upperCaseKey = key.toUpperCase();
      const upperCaseValue = value.toUpperCase();
      return upperCaseKey.includes(upperCaseQuestion) || upperCaseValue.includes(upperCaseQuestion);
    });

    if (partialMatches.length > 0) {
      // Find the best match using a string similarity algorithm
      const bestMatch = findBestMatch(upperCaseQuestion, partialMatches.map(([key, value]) => key + value));
      const closestMatch = partialMatches[bestMatch.bestMatchIndex];
      return closestMatch[1];
    }

    return this.messageMap.DEFAULT_MSG;
  }


  // getBotMessage(question: string) {
  //   for (const key in this.messageMap) {
  //     if (key.toUpperCase().includes(question.toUpperCase())) {
  //       return this.messageMap[key];
  //     }
  //   }
  //   return this.messageMap.DEFAULT_MSG;
  // }


}
