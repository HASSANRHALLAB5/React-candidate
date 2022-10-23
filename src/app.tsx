import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { FiDollarSign } from "react-icons/fi"
import { NumericFormat } from "react-number-format"

type activeloanType = {
    id: string
    name: string
    min_amount: string
    max_amount: string
    min_tenure: string
    max_tenure: string
    image: string
    interest: string
}

const App = () => {
    const [data, setData] = useState<activeloanType[]>([])
    const [activeloan, setActiveloan] = useState<activeloanType>({} as activeloanType)

    //@ fetching api
    function fetchData() {
        fetch("/products.json")
            .then((response) => response.json())
            .then((products) => {
                setData(products)
                setActiveloan(products[1])
                console.log(products)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (data) console.log(activeloan)
    }, [activeloan, data])

    const { register, handleSubmit, watch, setValue, control } = useForm({
        defaultValues: {
            month: "0",
            amount: "0",
        },
    })
    const onSubmit = (data: any) => console.log("succes", data)
    const onError = (data: any) => {
        Object.entries(data).map((o, index) => {
            // @ts-ignore
            console.log("error : ", o[1].message)
        })
    }
    //@ Valide Amount and Month
    const validateAmount = (value: string) => {
        const parseValue = parseInt(value)
        const parseMax = parseInt(activeloan.max_amount)
        const parseMin = parseInt(activeloan.min_amount)
        if (parseValue >= parseMin && parseValue <= parseMax) return true
        return "invalid amount"
    }

    const validateMonthe = (value: string) => {
        const parseValue = parseInt(value)
        const parseMax = parseInt(activeloan.max_tenure)
        const parseMin = parseInt(activeloan.min_tenure)
        if (parseValue >= parseMin && parseValue <= parseMax) return true
        return "invalide month"
    }
    //@ Calcul Amount
    const CalculeAmount = () => {
        const amount = parseInt(watch("amount"))
        const totalamount = amount + amount * parseInt(activeloan.interest)

        return totalamount
    }
    //@ Calcul Month

    const CalcuLatemonth = () => {
        const month = parseInt(watch("month"))
        console.log("month", watch("month"))
        const totalmonthe = Math.round(CalculeAmount() / month)
        return totalmonthe
    }
    //@ Calcul Date
    function addMonths(wantedMonth: number, date = new Date()) {
        date.setMonth(date.getMonth() + wantedMonth)

        return date.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col justify-center items-center w-full bg-#E5E5E5 h-screen ">
            <h1 className="w-full text-center text-sm text-blue relative bottom-[17px]">
                Let's plan your <span className="font-bold">Loan</span>
            </h1>
            <div className="w-[360px] sm:w-[560px] h-[586px] sm:h-[511px] shadow-2xl px-10 py-2 sm:py-4 ">
                <div className=" flex justify-center items-center gap-x-4 w-full ">
                    {data &&
                        data.map((product: activeloanType) => {
                            return (
                                <img
                                    key={product.id}
                                    onClick={() => {
                                        setActiveloan(product)
                                    }}
                                    className={
                                        product.id === "21"
                                            ? "h-[86px] w-[86px]"
                                            : product.id === "20"
                                            ? "h-[69px] w-[74px]"
                                            : "h-[69px] w-[69px]"
                                    }
                                    src={product.image}
                                />
                            )
                        })}
                </div>
                <div className="space-y-5 h-full ">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-3">
                        <div className="space-y-3 w-full">
                            <label className="text-sm text-center">Loan Amount</label>
                            <div className=" border-[1px] my-4 h-[56px] sm:max-w-[272px] w-full rounded-[4px] border-darkgray text-left relative">
                                <Controller
                                    control={control}
                                    name="amount"
                                    rules={{
                                        required: true,
                                        onChange: (e) => console.log(e.target.value),
                                    }}
                                    render={({ field: { onChange, name, value } }) => (
                                        <NumericFormat
                                            allowLeadingZeros
                                            thousandSeparator=","
                                            name={name}
                                            value={value}
                                            onChange={onChange}
                                            allowNegative={false}
                                            onValueChange={(v) => console.log(v)}
                                            className="pl-10 h-full w-full sm:w-auto font-medium "
                                        />
                                    )}
                                />

                                <FiDollarSign className="absolute left-[7px] bottom-[15px] h-6 w-8 text-darkwhite" />
                            </div>
                        </div>
                        <div className="space-y-3 w-full">
                            <h1 className=" text-sm text-dark">Number of Month</h1>
                            <div className=" items-center justify-center w-full px-3 py-2 gap-x-2 rounded-4  border-[1px] my-5 sm:w-[192px] h-[56px] border-darkgray relative ">
                                <div className="h-6 w-6 absolute top-0 bottom-4 left-0 my-4 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        onClick={() => {
                                            const month = parseInt(watch("month"))
                                            if (
                                                month > parseInt(activeloan.min_tenure) &&
                                                month < parseInt(activeloan.max_tenure)
                                            ) {
                                                setValue("month", Number(month - 1).toString())
                                            } else setValue("month", activeloan.min_tenure)
                                        }}
                                        className="text-gray w-full h-full">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 19.5L8.25 12l7.5-7.5"
                                        />
                                    </svg>
                                </div>
                                <input
                                    {...register("month", {
                                        required: true,
                                        validate: validateMonthe,
                                    })}
                                    className="h-full text-center w-full sm:w-auto focus:ring-0 focus:border-0 focus:outline-none "
                                />
                                <div className="h-6 w-6 absolute top-0 bottom-4 right-0 my-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        onClick={() => {
                                            const month = parseInt(watch("month"))
                                            if (
                                                month > parseInt(activeloan.min_tenure) &&
                                                month < parseInt(activeloan.max_tenure)
                                            ) {
                                                setValue("month", Number(month + 1).toString())
                                            } else setValue("month", activeloan.max_tenure)
                                        }}
                                        className="text-gray h-full w-full ">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" border-[1px] h-[155px] max-w-[480px] w-full border-darkgray rounded-lg">
                        <div className="py-4 sm:py-[31px] flex justify-between items-center h-[75px] mx-8">
                            <h1 className="text-lg md:text-xl leading-6 text-dark font-work ">
                                Mounthly amount
                            </h1>

                            <span className=" text-[32px] leading-[38.4px] font-bold text-darkblue">
                                ${!isNaN(CalcuLatemonth()) ? CalcuLatemonth() : 0}
                            </span>
                        </div>
                        <div className="px-8 py-4 sm:py-6 bg-darkwhite w-auto">
                            <p className=" text-xs  ">
                                You’re planning {watch("month")}{" "}
                                <span className="font-bold"> monthly deposits</span> to reach your
                                <span className="font-bold"> ${watch("amount") || 0} </span>{" "}
                                <span className="font-bold">
                                    <br />
                                    {addMonths(Number(watch("month")))}
                                </span>
                                . The total amount loaned will be{" "}
                                <span className="font-bold">
                                    {" "}
                                    ${!isNaN(CalculeAmount()) ? CalculeAmount() : 0}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="mb-6 sm:mb-10 mt-8 flex justify-center items-center text-darkwhite">
                        <button
                            type="submit"
                            className="bg-blue w-80 h-14 rounded-[32px] text-base text-white mt-4 ">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))
