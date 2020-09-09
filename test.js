/**
 * Copyright (c) 2002-2020 "Neo4j,"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// var neo4j = require('neo4j-driver').v1

var neo4j = require('neo4j-driver');
var driver = neo4j.driver('neo4j+s://34226275.databases.neo4j.io', neo4j.auth.basic('neo4j', 'hRd1SPv0mdpUYJ_mac-Zp-dnM-_MFZ6ZKTPNvANPVuk'));
var query = 
  `match (n) RETURN id(n) as id limit 5`;
async function run_query(i) {
var session = driver.session();
var time = new Date()
var counter = 0;
var last = 0;
await session.readTransaction((tx) => {
  return tx.run(query)
  .subscribe({
  onNext: record => {
        last = record.get('id');
        counter++;
    },
  onCompleted: () => {
    console.log(`${i}. run records ${counter} in ${new Date() - time} last ${last}`);
  },
  onError: (error) => {
    console.log(error);
  }});
});
session.close();
}
(async () => {
  try {
    results = []
    for (var i=0;i<10;i++) {
      console.log(i);
      await results.push(run_query(i));
    }
  for (r in results) {
    await r;
  }
  console.log("Done");
} catch(e) {
  console.log(e);
}
})();

// var query = [
//   'MERGE (alicee:Fox {name:{name_a},age:{age_a}})',
//   'MERGE (bobe:Fox {name:{name_b},age:{age_b}})',
//   'CREATE UNIQUE (alicee)-[alicee_knows_bobe:KNOWS]->(bobe)',
//   'RETURN alicee, bobe, alicee_knows_bobe'
// ]

// var params = {
//   name_a: 'Alicee',
//   age_a: 33,
//   name_b: 'Bobe',
//   age_b: 44
// }

// var driver = neo4j.driver('bolt+routing://localhost:7617')
// // var driver = neo4j.driver('bolt://localhost:7617')

// var streamSession = driver.session()
// var streamResult = streamSession.run(query.join(' '), params)
// streamResult.subscribe({
//   onNext: function (record) {
//     // On receipt of RECORD
//     for (var i in record) {
//       console.log(i)
//       console.log(record[i])
//     }
//   },
//   // onCompleted: function () {
//   //   var summary = streamResult.summarize()
//   //   // Print number of nodes created
//   //   console.log('')
//   //   console.log(summary.updateStatistics.nodesCreated())
//   //   streamSession.close()
//   // },
//   onError: function (error) {
//     console.log(error)
//   }
// })

// var promiseSession = driver.session()
// var promiseResult = promiseSession.run(query.join(' '), params)
// promiseResult
//   .then(function (records) {
//     records.forEach(function (record) {
//       for (var i in record) {
//         console.log(i)
//         console.log(record[i])
//       }
//     })
//     var summary = promiseResult.summarize()
//     // Print number of nodes created
//     console.log('')
//     console.log(summary.updateStatistics.nodesCreated())
//   })
//   .catch(function (error) {
//     console.log(error)
//   })
//   .then(function () {
//     promiseSession.close()
//   })