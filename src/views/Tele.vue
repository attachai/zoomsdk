<template>
  <div>
    <b-card title="Tele IFrame 🔒">
      <div class="col-12">
        <iframe
          id="myFrame"
          allow="camera; microphone"
          width="100%"
          height="500"
          title="W3Schools Free Online Web Tutorials"
        />
      </div>
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import Configs from '@/@core/utils/config/index'

export default {
  components: {
    BCard,
  },
  data() {
    return {
      src: `${Configs.tele_path}${this.$route.params.id}?pwd=${this.$route.query.pwd}&usn=${this.$route.query.usn}`,
      meetingNumber: this.$route.params.id,
      passWord: this.$route.query.pwd,
      role: 0,
      userName: this.$route.query.usn,
    }
  },
  mounted() {
    document.getElementById('myFrame').src = this.src
  },
}
</script>

<style>

</style>
