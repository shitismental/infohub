import cardIcon1 from "../assets/icons/test1.png"
import cardIcon2 from "../assets/icons/test2.png"
import cardIcon3 from "../assets/icons/test3.png"

export const coursesData = [
  {
    id: 1,
    mainCourseInfo: {
      name: "VIP Куратор",
      description: "В курсе собраны три курса профессий с телефона после прохождения которых, люди получают знания, практику и могут работать со своего гаджета. Вам нужно будет исполнять обязаности куратора, сопровождать учеников и быть с ними на связи",
      price: 1300,
      stages: [
        {
          id: 1,
          name: "Знайомство",
          description: "В курсе собраны три курса профессий с телефона после прохождения которых, люди получают знания, практику и могут работать со своего гаджета. Вам нужно будет исполнять обязаности куратора, сопровождать учеников и быть с ними на связи",
          length: "49",
          videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/11/e7/b6/11e7b652bafa8d01b2d0dc971b509db5.jpg",
          isUnlocked: true,
          isFree: true,
          isCompleted: true,
          tasks: [
            {
              id: 1,
              description: "Пройди будь ласка тестування відповівши на всі запитання відштовхувавшись від інформації яка була на уроці",
              taskLink: "youtube.com",
            }
          ]
        },
        {
          id: 2,
          name: "Більше про сферу роботи",
          length: "145",
          description: "БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ",
          videoURL: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/1f/9b/c1/1f9bc1a5255a3a53339aee690d8acace.jpg",
          isUnlocked: true,

        },
        {
          id: 3,
          name: "ДОІАВДОАІВДОІАВ",
          description: "В курсе собраны три курса профессий с телефона после прохождения которых, люди получают знания, практику и могут работать со своего гаджета. Вам нужно будет исполнять обязаности куратора, сопровождать учеников и быть с ними на связи",
          length: "49",
          videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/11/e7/b6/11e7b652bafa8d01b2d0dc971b509db5.jpg",
          isUnlocked: true,

        },
        {
          id: 4,
          name: "БІЛЬШЕ БІЛЬШЕ",
          length: "145",
          description: "БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ",
          videoURL: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/1f/9b/c1/1f9bc1a5255a3a53339aee690d8acace.jpg",
          isUnlocked: true,

        },
      ],
    },
    courseCardInfo: {
      heroTextTop: "VIP куратор",
      heroTextBottom: "Перепродаж курсів",
      cardIcon: cardIcon1,
      hasBottomBtn: true,
      isBought: true,
    },
  },
  {
    id: 2,
    mainCourseInfo: {
      name: "Інша назва",
      description: "ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС",
      price: 9999,
      stages: [
        {
          id: 1,
          name: "Знайомство",
          length: "49",
          isUnlocked: true,
          isFree: true
        },
        {
          id: 2,
          name: "Більше про сферу роботи",
          length: "145",
        },
      ],
    },
    courseCardInfo: {
      heroTextTop: "Оформлення профілю",
      heroTextBottom: "Лице куратора",
      cardIcon: cardIcon2,
      hasBottomBtn: true,
      isNew: true,
    },
  },
  {
    id: 3,
    mainCourseInfo: {
      name: "КУРС 3",
      description: "ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ ОПИС ЦЬОГО КУРСУ",
      price: 999,
      stages: [
        {
          id: 1,
          name: "Знайомство",
          description: "В курсе собраны три курса профессий с телефона после прохождения которых, люди получают знания, практику и могут работать со своего гаджета. Вам нужно будет исполнять обязаности куратора, сопровождать учеников и быть с ними на связи",
          length: "49",
          videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/11/e7/b6/11e7b652bafa8d01b2d0dc971b509db5.jpg",
          isUnlocked: true,
          isFree: true
        },
        {
          id: 2,
          name: "Більше про сферу роботи",
          length: "145",
          description: "БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ",
          videoURL: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/1f/9b/c1/1f9bc1a5255a3a53339aee690d8acace.jpg",
        },
        {
          id: 3,
          name: "ДОІАВДОАІВДОІАВ",
          description: "В курсе собраны три курса профессий с телефона после прохождения которых, люди получают знания, практику и могут работать со своего гаджета. Вам нужно будет исполнять обязаности куратора, сопровождать учеников и быть с ними на связи",
          length: "49",
          videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/11/e7/b6/11e7b652bafa8d01b2d0dc971b509db5.jpg",
        },
        {
          id: 4,
          name: "БІЛЬШЕ БІЛЬШЕ",
          length: "145",
          description: "БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ",
          videoURL: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/1f/9b/c1/1f9bc1a5255a3a53339aee690d8acace.jpg",
        },
      ],
    },
    courseCardInfo: {
      heroTextTop: "Методи просування",
      heroTextBottom: "Пошук клієнтів",
      cardIcon: cardIcon3,
      hasBottomBtn: true,
      isAvailable: true,
      hasDiscount: true,
      discountAmount: 30,
    },
  },
  {
    id: 4,
    mainCourseInfo: {
      name: "Інша назва",
      description: "ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС ОПИС",
      price: 9999,
      stages: [
        {
          id: 1,
          name: "Знайомство",
          description: "В курсе собраны три курса профессий с телефона после прохождения которых, люди получают знания, практику и могут работать со своего гаджета. Вам нужно будет исполнять обязаности куратора, сопровождать учеников и быть с ними на связи",
          length: "49",
          videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/11/e7/b6/11e7b652bafa8d01b2d0dc971b509db5.jpg",
          isUnlocked: true,
          isFree: true
        },
        {
          id: 2,
          name: "Більше про сферу роботи",
          length: "145",
          description: "БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ",
          videoURL: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/1f/9b/c1/1f9bc1a5255a3a53339aee690d8acace.jpg",
        },
        {
          id: 3,
          name: "ДОІАВДОАІВДОІАВ",
          description: "В курсе собраны три курса профессий с телефона после прохождения которых, люди получают знания, практику и могут работать со своего гаджета. Вам нужно будет исполнять обязаности куратора, сопровождать учеников и быть с ними на связи",
          length: "49",
          videoURL: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/11/e7/b6/11e7b652bafa8d01b2d0dc971b509db5.jpg",
        },
        {
          id: 4,
          name: "БІЛЬШЕ БІЛЬШЕ",
          length: "145",
          description: "БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ БІЛЬШЕ ПРО СФЕРУ РОБОТИ",
          videoURL: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          videoPreviewImg: "https://i.pinimg.com/736x/1f/9b/c1/1f9bc1a5255a3a53339aee690d8acace.jpg",
        },
      ],
    },
    courseCardInfo: {
      heroTextTop: "SMM ведення",
      heroTextBottom: "з телефону",
      hasBottomBtn: true,
      isAvailable: true,
      isBought: true,
    },
  },
]