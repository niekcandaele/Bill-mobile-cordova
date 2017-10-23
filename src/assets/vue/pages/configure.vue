<template>
<f7-page>
    <f7-navbar title="Configuration" back-link="Back" sliding></f7-navbar>
    <f7-block inner>
        <p>CONFIG</p>
        </f7-block>

    <f7-block>
        <f7-list form>
            <f7-list-item>
                <f7-label>IP</f7-label>
                <f7-input type="text" placeholder="Server IP"></f7-input>
            </f7-list-item>
                        <f7-list-item>
                <f7-label>Web API port</f7-label>
                <f7-input type="integer" placeholder="Webport"></f7-input>
            </f7-list-item>
                        <f7-list-item>
                <f7-label>Authorization name</f7-label>
                <f7-input type="text" placeholder="Auth name"></f7-input>
            </f7-list-item>
                        <f7-list-item>
                <f7-label>Authorization token</f7-label>
                <f7-input type="text" placeholder="Auth token"></f7-input>
            </f7-list-item>
        </f7-list>

        <f7-button color="green" round> Button Round
        </f7-button>
    </f7-block>
</f7-page>
</template>

<script>
export default {};
</script>