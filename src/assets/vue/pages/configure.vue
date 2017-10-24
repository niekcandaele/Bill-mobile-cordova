<template>
<f7-page>
    <f7-navbar title="Configuration" back-link="Back" sliding></f7-navbar>
    <f7-block inner>
        <p>CONFIG</p>
        </f7-block>

    <f7-block>
        <f7-list form class="store-data" id="configForm">
            <f7-list-item>
                <f7-label>IP</f7-label>
                <f7-input v-model="serverIP" type="text" :placeholder="serverIP" name="serverIP"></f7-input>
            </f7-list-item>
                        <f7-list-item>
                <f7-label>Web API port</f7-label>
                <f7-input v-model="webPort" type="integer" :placeholder="webPort" name="webPort"></f7-input>
            </f7-list-item>
                        <f7-list-item>
                <f7-label>Authorization name</f7-label>
                <f7-input v-model="authName" type="text" :placeholder="authName" name="authName"></f7-input>
            </f7-list-item>
                        <f7-list-item>
                <f7-label>Authorization token</f7-label>
                <f7-input v-model="authToken" type="text" :placeholder="authToken" name="authToken"></f7-input>
            </f7-list-item>
        </f7-list>
    </f7-block>
</f7-page>
</template>

<script>

export default {
  data() {
    return {
      message: "test",
      serverIP: "ip",
      webPort: "port",
      authName: "name",
      authToken: "token"
    };
  }
};
</script>