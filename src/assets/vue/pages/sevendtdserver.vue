

<template>
    <f7-page>
        <f7-navbar title="El Server" back-link="Back" sliding></f7-navbar>
        <f7-block inner>
            <p>This is some info about Elanio's server</p>
        </f7-block>

        <f7-block inner>
            <p>{{getStatsData}}</p>
            <p>
                <strong>Errors</strong> <br> {{errors}}</p>
        </f7-block>
    </f7-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      getStatsData: "test",
      errors: []
    }
  },

  // Fetches posts when the component is created.
  created() {
    axios.get(`http://localhost:3000/api/getstats?guild=317995576958648321`)
    .then(response => {
      this.getStatsData = response
    })
    .catch(e => {
        console.log(e)
      this.errors.push(e)
    })
  }
}
</script>