import Login from "@/components/Login";


export default function LoginPage() {
    console.log('API_URL', process.env.API_URL)
    return (
        <>
            <Login/>
        </>
    );
  }
  