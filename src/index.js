import sql from 'mssql'
import { sqlConfig } from '../src/sql/config.js'

sql.on('error', err => {
    console.error(err)
})

sql.connect(sqlConfig).then(pool => {
    //Vamos executar a stored procedure
    return pool.request()
    .input('placa', sql.Char(7), 'ABC9944')
    .input('nome', sql.VarChar(50), 'Fusca')
    .input('descricao', sql.VarChar(200), 'Fusca para colecionador')
    .input('fabricacao', sql.Date, '1978-04-02')
    .input('preco', sql.Numeric, 3000)
    .output('codigogerado', sql.Int)
    .execute('SP_I_VEI_VEICULO')
}).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err.message)
})