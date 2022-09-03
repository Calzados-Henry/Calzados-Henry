//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//*                               ,,~~~~~~,,..
//*                               ...., ,'~             |
//*                               \    V                /
//*                                \  /                 /
//*                                ;####>     @@@@@     )
//*                                ##;,      @@@@@@@    )
//*                             .##/  ~>      @@@@@   .   .
//*                            ###''#>              '      '
//*        .:::::::.      ..###/ #>               '         '
//*       //////))))----~~ ## #}                '            '
//*     ///////))))))                          '             '
//*    ///////)))))))\      SEHOS STORE       '              '
//*   //////)))))))))))                      '               '
//*   |////)))))))))))))____________________________________).
//*  |||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//*  ````````````````````````````'''''''''''''''''''''''''''''
//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import server from './src/app';
import { sequelize } from './src/db'

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`App runing at http://localhost:${PORT}`)
  sequelize.authenticate().then(async () => {
    console.log("Database conected")
    try {
      await sequelize.sync({ alter: true }) //alter or force
    } catch (error: any) {
      console.log(error.message)
    }
  }).catch((e: any) => {
    console.log(e.message)
  })
})