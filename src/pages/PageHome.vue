<template>
 <q-page>
    <div class="row items-end q-col-gutter-md q-pa-md">
      <div class="col-10 col-sm-8">
        <q-input bottom-slots autogrow dark v-model="newStatusContent" placeholder="What's Happening?" counter maxlength="280" class="text-body1 new-status">
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://thelazy.xyz/assets/profile.jpg">
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn @click="addNewStatus" :disable="newStatusContent" round dense flat icon="send" class="q-mb-lg" />
      </div>
    </div>
    <q-separator size="10px" class="divider"/>

    <q-list separator dark>
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
      <q-item v-for="status in status" :key="status.id" class="q-py-md status">
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://thelazy.xyz/assets/profile.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Raga Fatwa</strong>
            <span>
              <q-icon name="verified" size="xs" class="verified"/>
            </span>
            <span class="text-grey-6">
              @thelazy
              <br class="lt-sm">&bull; <span class="text-subtitle2">{{ status.date | relativeDate }}</span>
            </span>
          </q-item-label>
          <q-item-label class="status-content text-body2"> {{ status.content }}
          </q-item-label>
          <div class="row q-mt-sm status-icon">
            <q-btn
              flat
              round
              color="grey"
              icon="insert_comment" 
              size="md"
              class="q-mr-sm"
            />
            <q-btn
              @click="toggleLiked(status)"
              flat
              round
              :color="status.liked ? 'primary' : 'grey'"
              icon="favorite"
              class="q-mr-sm" 
            />
            <q-btn
              flat
              round
              color="grey"
              icon="share" 
              class="q-mr-sm"
            />
            <q-btn
              @click="deleteStatus(status)"
              flat
              round
              color="grey"
              icon="delete" 
            />
          </div>
        </q-item-section>

      </q-item>
      </transition-group>
    </q-list>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'

export default {
  name: 'PageHome',
  data() {
    return {
      newStatusContent: '',
      status: [
        // {
        //   id: "ID1",
        //   content: 'lorem',
        //   date: 1621925680057,
        //   liked: false
        // },
        // {
        //   id: "ID2",
        //   content: 'lorem ipsum',
        //   date: 1621925680060,
        //   liked: true
        // }
      ]
    }
  },
  methods: {
    addNewStatus() {
      let newStatus = {
        content: this.newStatusContent,
        date: Date.now(),
        liked: false
      }
      // this.status.unshift(newStatus)
      db.collection("status").add(newStatus).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
      this.newStatusContent = ''
    },
    deleteStatus(status) {
      db.collection("status").doc(status.id).delete()
      .catch((error) => {
        console.error("Error removing document: ", error);
    });
    },
    toggleLiked(status) {
      var statusDB = db.collection("status").doc(status.id)
      return statusDB.update({
        liked: !status.liked
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date())
    }
  },
  mounted() {
    db.collection('status').orderBy('date').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            let statusChange = change.doc.data()
            statusChange.id = change.doc.id
            if (change.type === "added") {
                // console.log("New status: ", statusChange)
                this.status.unshift(statusChange)
            }
            if (change.type === "modified") {
                // console.log("Removed status: ", statusChange)
                let index = this.status.findIndex(status => status.id === statusChange.id)
                Object.assign(this.status[index], statusChange)
            }
            if (change.type === "removed") {
                // console.log("Removed status: ", statusChange)
                let index = this.status.findIndex(status => status.id === statusChange.id)
                this.status.splice(index, 1)
            }
        })
    })
  }
}
</script>

<style lang="sass">

.new-status
  textarea
    line-height: 1.4 !important

.divider
  background-color: #1D1D1D
  border-top: solid 1px #00FFE7
  border-bottom: solid 1px #00FFE7
.status
  border-bottom: solid 1px #1D1D1D
.status-content
  white-space: pre-line

.status-icon
  margin-left: -10px

.border
  border-bottom: 1px solid #1D1D1D

.verified
  margin-left: 2px
  padding-bottom: 3px
</style>


