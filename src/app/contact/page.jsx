export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4"> 
    <div className="max-w-7xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="mb-4 text-lg text-center">
        We'd love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out.
      </p>
      <div className="space-y-4">   
        <div>
          <h2 className="text-2xl font-semibold">Email</h2>
          <p className="text-blue-500 hover:underline">
            <a href="mailto:email@name.com">
                email@name.com
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Phone</h2>
          <p>
            <a href="tel:+1234567890" className="text-blue-500 hover:underline">
                +1 (234) 567-890
            </a>    
            </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Address</h2>
            <p>1234 Remote St, Worktown, WT 56789</p>
        </div>
          </div>
        </div>
      </div>
  );
}