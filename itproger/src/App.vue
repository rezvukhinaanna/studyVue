<template>
  <div class="layout-wrapper layot-static">
    <Toolbar class="layout-toolbar">
      <template #start>
        <div class="flex items-center gap-2">
          <Button label="Файлы" text plain></Button>
          <Button label="Редактор" text plain></Button>
          <Button label="Вид" text plain></Button>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Button label="Скачать" severity="contrast" size="small"></Button>
        </div>
      </template>
    </Toolbar>

    <div class="layout-sidebar">
      <Button 
        class="clickButton"
        label="Primary" 
        rounded 
        type="button" 
        @click="userData()"
      >Показать котиков</Button>
    </div>
    <div class="content">
      <div class="cat-grid">
        <div class="cat-info" v-for="cat in cats" :key="cat.id">
          <h1>{{ cat.name }}</h1>
          <Image 
            alt="Изображение котика" 
            preview
            :src="cat.imageSrc" 
            width="250"
          ></Image>
          <h1
            class="intelligence"
          >Интеллект: {{ cat.intelligence }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      cats: [],
      
      showIntelligence: false,
      showImage: false,
      imageSrc:""
    }
  },
  methods: {
    async userData() {
      const result = await fetch('https://api.thecatapi.com/v1/breeds', 
        {method: 'get', 
         headers:{'Content-Type':'application/json',
                  'x-api-key': 'live_wayzGc5nRdok2P1hwtepqCgOHLkuSHJHoQq6JMZYpeIyPQLUJTI4xCcXBDcKQCwm'}
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка запроса')
          }
          return response.json()
        })
        .then((info) => {
          return info.map((item) => ({name: item.name, intelligence: item.intelligence, id: item.reference_image_id}))
        }
        )
        .catch((error) => {
          console.log(error)
        })

        const allSelectedCat = []
        for (let i = 0; i < 12; i += 1) {
          const randomIndex = Math.floor(Math.random()*result.length)
          const selectedCat = result[randomIndex]
          const imageID = selectedCat.id

          allSelectedCat.push({
            ...selectedCat,
            imageSrc: `https://cdn2.thecatapi.com/images/${imageID}.jpg`
          })
        }
        this.cats = allSelectedCat
  }
  
}
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  width: 100%;
  min-height: 100vh;
}

.layout-wrapper {
  min-height: 100vh;
}

.layout-toolbar {
  display: flex;
  height: 5rem;
  width: 100%;
  padding: 0 2rem;
  align-items: center;
  position:fixed;
  z-index: 1;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); 
  /* padding: 1rem 1rem 1rem 1.5rem */
}

.layout-sidebar {
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  height: calc(100vh - 5.4rem);
  z-index: 2;
  top: 5.4rem;
  width: 300px;
  border: 1px solid rgb(237, 237, 237);
  padding: 0.5rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.982);
  /* background-color: rgb(246, 246, 246); */
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

h1 {
  margin: 0;
  color: var(--p-button-text-plain-color);
  font-weight: var(--p-button-label-font-weight);
}

.title {
  display: flex;
  flex-direction: column;
}

button {
  background-color: rgb(176, 113, 235);
  border: none;
  font-size: 26px;
}

.clickButton {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

button:hover {
  background-color:rgb(88, 88, 240)
}

.image {
  width: 25px;
}

.content {
  margin-left: 350px;
  padding-top: 8rem;
  width: calc(100% - 350px);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

span {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 20px; */
  width: 250px;
}

.p-image-preview-mask {
  width: 250px;
}

.cat-info {
  /* margin-bottom: 2rem; */
  background: white;
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  align-items: center;
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.cat-image {
  width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>

<!-- border-radius: 3rem; -->