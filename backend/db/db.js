const mongoose=require("mongoose");
const Question=require("../models/Question");
require("dotenv");

const db=async()=>{
     await mongoose.connect(process.env.DB).then(()=>{
        console.log("Database conneected");
        
    }).catch((err)=>{
        console.log(err);
        
    })
};

db();

const data= [
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "Who among the following visited India during the reign of Chandragupta Maurya and wrote the book 'Indica'?",
    "options": [
      "Fa-Hien",
      "Megasthenes",
      "Hiuen Tsang",
      "Al-Biruni"
    ],
    "correctAnswer": "Megasthenes"
  },
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "The Fourth Buddhist Council was held during the reign of which ruler?",
    "options": [
      "Ashoka",
      "Kanishka",
      "Harshavardhana",
      "Chandragupta Maurya"
    ],
    "correctAnswer": "Kanishka"
  },
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "Who among the following was the author of 'Rajatarangini'?",
    "options": [
      "Kalhana",
      "Banabhatta",
      "Kalidasa",
      "Chanakya"
    ],
    "correctAnswer": "Kalhana"
  },
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "The Regulating Act, which marked the beginning of parliamentary control over the East India Company, was passed in:",
    "options": [
      "1765",
      "1773",
      "1784",
      "1793"
    ],
    "correctAnswer": "1773"
  },
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "Who was the first Indian Governor-General of independent India?",
    "options": [
      "Dr. Rajendra Prasad",
      "C. Rajagopalachari",
      "Jawaharlal Nehru",
      "Lord Mountbatten"
    ],
    "correctAnswer": "C. Rajagopalachari"
  },
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "Which Act transferred the administration of India from the East India Company to the British Crown?",
    "options": [
      "Regulating Act, 1773",
      "Pitt's India Act, 1784",
      "Government of India Act, 1858",
      "Indian Councils Act, 1861"
    ],
    "correctAnswer": "Government of India Act, 1858"
  },
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "Who among the following is known as the 'Napoleon of India'?",
    "options": [
      "Chandragupta Maurya",
      "Samudragupta",
      "Harshavardhana",
      "Ashoka"
    ],
    "correctAnswer": "Samudragupta"
  },
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "The Battle of Haldighati (1576) was fought between Maharana Pratap and:",
    "options": [
      "Akbar",
      "Raja Man Singh",
      "Todar Mal",
      "Bairam Khan"
    ],
    "correctAnswer": "Raja Man Singh"
  },
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "Who among the following founded the Brahmo Samaj in 1828?",
    "options": [
      "Swami Vivekananda",
      "Raja Ram Mohan Roy",
      "Swami Dayanand Saraswati",
      "Ishwar Chandra Vidyasagar"
    ],
    "correctAnswer": "Raja Ram Mohan Roy"
  },
  {
    "category": "GK-GS",
    "subCategory": "History",
    "difficulty": "Hard",
    "question": "Who was the Viceroy of India when the Partition of Bengal was carried out in 1905?",
    "options": [
      "Lord Curzon",
      "Lord Ripon",
      "Lord Minto",
      "Lord Hardinge"
    ],
    "correctAnswer": "Lord Curzon"
  }
]

Question.insertMany(data);