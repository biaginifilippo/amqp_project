let dosatori
let configurazioni
export default class deviceDAO {
    static async injectDB(conn) {
        if (dosatori) return
        try {
            dosatori = await conn.db(process.env.DB_NAME).collection("Dosatori");
        } catch (e) {
            console.error(`unable to set collection handle with  db: ${e}`)
        }
        if (configurazioni) return
        try {
            configurazioni = await conn.db(process.env.DB_NAME).collection("Configurazione");
        } catch (e) {
            console.error(`unable to set collection handle with  db: ${e}`)
        }
    }
    static async updateDB(msg) {
        console.log(msg)
        let params = msg.split(".")
        try {
            dosatori.updateOne(
                { id: params[0] },
                { $set: { level: params[1] } },
            )
            dosatori.updateOne(
                { id: params[0] },
                { $set: { ph: params[2] } },
            )
            dosatori.updateOne(
                { id: params[0] },
                { $set: { temperature: params[3] } },
            )
            dosatori.updateOne(
                { id: params[0] },
                { $set: { time: params[4] } },
            )
        }
        catch (e) {
            console.log(`unable to modify the product: ${e}`)
        }
    }
    static async updateConfiguration(config) {

        
        try {
            configurazioni.updateOne(
                {id: config.id},
                {$set: {cloro_H : config.cloro} }
            )
            configurazioni.updateOne(
                {id: config.id},
                {$set: {tempMin : config.tempMin} }
            )
            configurazioni.updateOne(
                {id: config.id},
                {$set: {tempMax : config.tempMax} }
            )
        }
        catch (e){
            console.log(`unable to update configuration: ${e}`)
            return e
        }
    }

    static async getValues() {
        let dosatore
        let configurazione
        try {
            dosatore = await dosatori
                        .find(undefined)
            configurazione = await configurazioni
                        .find(undefined)
        } catch (e) {
            console.log(`unable to retrieve values from the server ${e}`)
            return
        }
        const dosatoree = await dosatore.toArray()
        const configurazionee = await configurazione.toArray()
        return ({dos: dosatoree,
                 con: configurazionee
                })
    }
}
