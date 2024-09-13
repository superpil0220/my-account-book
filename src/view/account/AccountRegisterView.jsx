import * as XLSX from "xlsx";
import {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faRedo, faSave} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AccountRegisterView() {
  console.log("AccountRegisterView Start!");

  const [isUploadFile, setIsUploadFile] = useState(false);
  const [accountData, setAccountData] = useState({});
  const fileInputRef = useRef(null);

  // todo: 개발 완료 후 삭제
  // useEffect(() => {
  //   setIsUploadFile(true)
  //   setAccountData({
  //     "searchDate": "2024.08.11 - 2024.09.11",
  //     "data": [
  //       {
  //         "date": "2024.08.11 14:53:20",
  //         "type": "출금",
  //         "transfer": "-178,000",
  //         "balance": "57,597",
  //         "transferType": "일반이체",
  //         "contents": "김경필",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.08.17 13:14:31",
  //         "type": "입금",
  //         "transfer": "2,115,092",
  //         "balance": "2,172,689",
  //         "transferType": "일반입금",
  //         "contents": "김경필",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.08.24 04:27:20",
  //         "type": "입금",
  //         "transfer": "49",
  //         "balance": "2,172,738",
  //         "transferType": "예금이자",
  //         "contents": "입출금통장 이자",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.08.25 18:23:59",
  //         "type": "출금",
  //         "transfer": "-30,000",
  //         "balance": "2,142,738",
  //         "transferType": "일반이체",
  //         "contents": "임세랑",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.08.25 18:41:05",
  //         "type": "입금",
  //         "transfer": "130,000",
  //         "balance": "2,272,738",
  //         "transferType": "일반입금",
  //         "contents": "김경필",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.09.08 20:34:28",
  //         "type": "입금",
  //         "transfer": "8,400,000",
  //         "balance": "10,672,738",
  //         "transferType": "일반입금",
  //         "contents": "김경필",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.09.08 21:02:06",
  //         "type": "출금",
  //         "transfer": "-610,000",
  //         "balance": "10,062,738",
  //         "transferType": "일반이체",
  //         "contents": "김경필",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.09.08 22:25:39",
  //         "type": "출금",
  //         "transfer": "-124,000",
  //         "balance": "9,938,738",
  //         "transferType": "일반이체",
  //         "contents": "김경필",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.09.09 21:36:39",
  //         "type": "출금",
  //         "transfer": "-5,200,000",
  //         "balance": "4,738,738",
  //         "transferType": "일반이체",
  //         "contents": "임세랑",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.09.09 21:45:01",
  //         "type": "입금",
  //         "transfer": "30,000,000",
  //         "balance": "34,738,738",
  //         "transferType": "일반입금",
  //         "contents": "임세랑",
  //         "memo": ""
  //       },
  //       {
  //         "date": "2024.09.11 13:12:53",
  //         "type": "출금",
  //         "transfer": "-400,000",
  //         "balance": "34,338,738",
  //         "transferType": "일반이체",
  //         "contents": "임세랑",
  //         "memo": "신혼여행 계약금"
  //       }
  //     ]
  //   })
  // }, []);

  async function onSaveToNotion() {
    console.log("On Save To Notion");
    // alert("개발 진행주주중~")
    const axiosBuilder = axios.create({
      baseURL: '/notion',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer secret_Qe9377fMj8GjcIrBi4cVj0YxYOLNP1ki3cABkUrdr93',
        'Notion-Version': '2022-06-28'
      }
    })
    axiosBuilder.get("/databases/2052b9e7d6a24bca91489bc49e114fe4").then(
        (response) => {
          console.log("response", response);
        })
  }

  function onReset() {
    alert("개발 진행주주중~")
  }

  function handleFileChange(e) {
    const files = e.target.files;
    if (!files) {
      console.error("Not Found File");
      return
    }
    const reader = new FileReader();
    reader.onload = (e1) => {
      if (!e1.target?.result) {
        return;
      }

      const data = new Uint8Array(e1.target.result);
      try {
        const workbook = XLSX.read(data, {type: "array"});
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const arrayData = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
        console.log(arrayData);

        const displayData = {
          searchDate: "",
          data: []
        }

        let isPassTransferDate = false;
        arrayData.forEach((item1, index1) => {
          item1.forEach((item2, index2) => {
            if (item2 === "조회기간") {
              displayData.searchDate = item1[index2 + 1];
            }

            if (item2 === "거래일시") {
              isPassTransferDate = true;
            }

            if (isPassTransferDate && (item2 === "입금" || item2 === "출금")) {
              displayData.data.push({
                date: item1[index2 - 1],
                type: item2,
                transfer: item1[index2 + 1],
                balance: item1[index2 + 2],
                transferType: item1[index2 + 3],
                contents: item1[index2 + 4],
                memo: item1[index2 + 5],
              })
            }
          })
        })

        console.log({displayData});
        setAccountData(displayData)
        setIsUploadFile(true);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };
    reader.readAsArrayBuffer(files[0]);
  }

  if (!isUploadFile) {
    // 파일 업로드 전
    return (<>
      <input
          type="file"
          hidden="true"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
          ref={fileInputRef}
      />
      <button
          onClick={() => fileInputRef.current.click()}
          className="max-w-[1000px] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[90%] h-[50%] bg-[#1e3a8a] text-white border-sky-600 border-dotted border-2 px-4 py-2 rounded"
      >
        <span className="text-lg">File Upload </span>
        <span className="text-sm">(.xlsx, .xls, .csv)</span>
      </button>
    </>)
  } else {
    // 파일 업로드 후
    return (<>
      <div className="flex justify-between">
        <p className="text-sm">
          <FontAwesomeIcon icon={faCalendar} className="mr-2"/>
          <span>{accountData.searchDate}</span>
        </p>
        <div>
          <button className="mr-5" onClick={onSaveToNotion}>
            <FontAwesomeIcon icon={faSave} className="mr-1"/>
            <span className="text-sm">저장</span>
          </button>
          <button onClick={onReset}>
            <FontAwesomeIcon icon={faRedo} className="mr-1"/>
            <span className="text-sm">초기화</span>
          </button>
        </div>
      </div>

      <table
          className="w-full text-center sm:border-separate sm:border-spacing-5">
        {
          accountData.data.map((item, index) => {
            return (
                <>
                  <tr key={index}>
                    <td>
                      <span
                          className={` px-1 py-0.5 rounded-md text-xs ${item.type
                          === '출금' ? 'bg-rose-600 text-rose-200'
                              : 'bg-sky-600 text-sky-200'}`}>{item.type}
                      </span>
                      <p className="text-xs">{item.transferType}</p>
                      <span className="text-xs">{item.date}</span>
                    </td>
                    <td className="text-xs">
                      <p>거래금액</p>
                      <p className="sm:text-sm">{item.transfer}</p>
                    </td>
                    <td className="text-xs">
                      <p>거래 후 잔액</p>
                      <p className="sm:text-sm">{item.balance}</p>
                    </td>
                    <td className="text-xs">
                      <p>내용</p>
                      <p className="sm:text-sm">{item.contents}</p>
                    </td>
                    <td className="text-xs">
                      <p>메모</p>
                      <p className="sm:text-sm">{item.memo ? item.memo
                          : '-'}</p>
                    </td>
                  </tr>
                </>
            );
          })
        }
      </table>
    </>)
  }
}

export default AccountRegisterView;
