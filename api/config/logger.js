export const logger = ({pageName,action,type,fields})=>{
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    const dateTimeString = `${dateString} ${timeString}`;
    console.log(`Date: ${dateTimeString} || PageName: ${pageName} || Action: ${action} || Request: ${type} || fields: ${JSON.stringify(fields)}`)
}