import React, { useEffect, useContext, useState } from "react"
import styles from "../../styles/ReportCenter.module.css"
import axios from "axios"
import Navbar from "@/components/uiComponents/Navigations/Navbar"
import ReportCenterNavigation from "@/components/uiComponents/Navigations/ReportCenterNavigation"
import { GoCalendar } from "react-icons/go"
import { StateContext, mainStateProvider } from '../../StateContex/index'
import { BET_COLUMNS } from "@/components/tableColumns/betRecordsColumns"
import AppTable from "@/components/AppTable"
import CustomTablePagination from "@/components/CustomTablePagination"
import { useBetRecord } from "@/StateContex/GameContext"
import { apiClient } from "@/utils/config"
import { MoonLoader } from "react-spinners"
import { decryptAndUse, decryptAndUse2, encryptAndStore } from "@/utils/index_joe"
import { SlRefresh } from 'react-icons/sl'
import { CiSearch } from 'react-icons/ci'
import { useAppQuery } from "@/hooks/useAppQuery"
import BaseTable from "@/components/BaseTable"




const BettingRecord = () => {


    // aframson77@gmail.com  =====  Salvation@77

    //const [betRecords, setBetRecords] = useState<BetRecord[]>([])
    //const [lotteryName, setLotteryName] = useState<LotteryName[]>([])

    const { globaldrawNumber, mainTimeLeft } = mainStateProvider()
    const { setBetRecords } = useBetRecord()


    const filterDate: string[] = ["all", "today", "3days ago"]
    const [filterColor, setFilterColor] = useState(0)
    const [todaysDate, setTodaysDate] = useState(new Date().toISOString().slice(0, 10))
    const [currentLotteryName, setCurrentLotteryName] = useState(1)
    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    //const [betSearch, setBetSearch] = useState("");


    const handlePageIndexChange = (pageIndex: number) => {
        setPageIndex(pageIndex)
    }

    const handlePageSizeChange = (pageSize: number) => {
        setPageSize(pageSize)
    }


    const onSuccess = (data: any) => {
        console.log("Success from useQuery: ", data)
        if (data?.results?.length === 0) {
            console.log("No data found")
        }
    }

    const onError = (error: any) => {
        console.log("Error from useQuery: ", error)
        if (error?.message === "Network Error") {

        }
    }

    const handleLotteryNameSelection = (lotteryId: number) => {
        setCurrentLotteryName(lotteryId)
    }


    const url = `/betrecords.php?gameType=${currentLotteryName}&limit=${pageSize}&page=${pageIndex}`
    const queryKeys = [`betrecords_${currentLotteryName}`, pageIndex, pageSize]
    const params = { onSuccess, onError, url, queryKeys, fetchInterval: "20000" }
    const { isLoading, data: betRecords, isError, error, isSuccess, isFetching } = useAppQuery(params)
    setBetRecords(betRecords?.results)

    const lotteryNamesUrl = "/alllotterygames.php"
    const lotteryNamesQueryKeys = ['lotteryNames_1']
    const lotteryNamesParams = { onSuccess, onError, url: lotteryNamesUrl, queryKeys: lotteryNamesQueryKeys }
    const { data: lotteryNames } = useAppQuery(lotteryNamesParams)


    return (
        <>

            <Navbar>
                <ReportCenterNavigation>
                    {/* {error && <p>{error.message}</p>} */}
                    <section style={{ backgroundColor: "#fff", opacity: 0.9, paddingBottom: "8rem", paddingTop: "1rem" }}>
                        <section style={{ display: "flex", alignItems: "center", gap: "4rem", marginTop: "1rem" }}>
                            <div className={styles.firstdiv}>
                                <div className={styles.personal}>Personal</div>
                                <div>team {mainTimeLeft}</div>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.container}>
                                <div className={styles.gametypes}>
                                    <div className={styles.gametypesinner1}>
                                        <div>
                                            <label htmlFor="">game type</label>
                                            <select name="" id="" className={styles.select}>
                                                <option value="all">All</option>
                                                <option value="one">One</option>
                                                <option value="two">Two</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="">query account</label>
                                            <select name="" id="" className={styles.select}>
                                                <option value="all">All</option>
                                                <option value="one">One</option>
                                                <option value="two">Two</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.gametypesinner2}>
                                        <div>
                                            <label htmlFor="">Lottery Name</label>
                                            {/* <select name="" id="" className={styles.select} onChange={(e)=> handleLotteryNameSelection(Number(e.target.value))}> */}
                                            <select name="" id="" className={styles.select} onChange={(e) => handleLotteryNameSelection(Number(e.target.value))}>
                                                {
                                                    lotteryNames?.data && lotteryNames?.data?.map((lottery: any, index: number) => (
                                                        <>
                                                            <option key={index} value={lottery.gt_id}>{lottery.name}</option>
                                                        </>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            {/* <label htmlFor="">bet id</label> */}
                                            {/* <div className={styles.betid_search_box}>
                                               <input type="text" className={styles.input} onChange={handleBetTokenSearch} />
                                               <button onClick={handleBetIdSearch} className={styles.search_icon}><CiSearch onClick={refreshBetSearch} /></button>
                                               {betSearch.length > 0 && <SlRefresh onClick={()=> refresh()} style={{cursor:"pointer"}}/>}
                                             </div> */}
                                            {/* <TableColumnFilter/> */}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.gametypesinner3}>
                                    <div>
                                        <label htmlFor="">state</label>
                                        <select name="" id="" className={styles.select}>
                                            <option value="all">All</option>
                                            <option value="one">One</option>
                                            <option value="two">Two</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <div className={styles.bettingDivider}></div> */}
                        {/* <div className={styles.filters}>
                            <div className={styles.filtertime}> <div>query time</div> <div> <GoCalendar color="#24ACFA" size={25} /> 2023-03-21 03:00:00 至 2023-03-22 03:00:00</div> </div>
                            <div className={styles.filterdatetime}>
                                {
                                    filterDate.map((date, index) => (
                                        <>
                                            <div
                                                onClick={() => handleDateTimeFilter(index, date)}
                                                className={`${index === filterColor ? styles.filterItem : null}`} >
                                                {date}
                                            </div>
                                            <div className={styles.line2}></div>
                                        </>
                                    ))
                                }
                            </div>
                        </div> */}
                        <div className={styles.betTable}>
                               <BaseTable
                                data={betRecords}
                                columns={BET_COLUMNS}
                                isLoading={isLoading}
                                error={error}
                                isSuccess={isSuccess}
                                onPageIndexChange={handlePageIndexChange}
                                onPageSizeChange={handlePageSizeChange}
                               />
                            {
                                isLoading &&
                                <div className={styles.loader}>
                                    <MoonLoader size={80} color="#4db9f8" />
                                </div>
                            }

                        </div>
                    </section>
                </ReportCenterNavigation>
            </Navbar>
        </>
    )
}

export default BettingRecord