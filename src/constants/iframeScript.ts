export const ANCHOR_TAG_SCRIPT: string = `
window.addEventListener("load", (event) => {
    var aTags = document.getElementsByTagName('a')
    Object.keys(aTags).forEach((indexKey) => {
        var aTag = aTags[indexKey]
        if(aTag){
        aTag.setAttribute("href","javascript:void(0)")
        }
    })
});
`;

export const MAIN_SCRIPT: string = `
<script>
${ANCHOR_TAG_SCRIPT}
</script>
`;
