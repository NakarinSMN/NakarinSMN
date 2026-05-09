import { useState } from 'react'
import { useToast, ToastContainer, Modal, SpeedDial } from '@nakarinsmn/smn-lib'
import '@nakarinsmn/smn-lib/dist/index.css'
import { BsPlus, BsHeart, BsShare, BsChat } from 'react-icons/bs'
import './App.css'

function App() {
  const { toasts, toast, remove } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'warning' | 'error' | 'info'>('success')

  const openModal = (type: typeof modalType) => {
    setModalType(type)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={remove} position="top-right" />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">SMN Library Playground</h1>
        <p className="text-gray-600 mb-12">Try Toast, Modal, and SpeedDial components</p>

        {/* Toast Demo */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Toast Notifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => toast.success('สำเร็จ!', 'ข้อมูลถูกบันทึกแล้ว')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors active:scale-95"
            >
              Success
            </button>
            <button
              onClick={() => toast.warning('คำเตือน!', 'โปรดตรวจสอบข้อมูล')}
              className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors active:scale-95"
            >
              Warning
            </button>
            <button
              onClick={() => toast.error('เกิดข้อผิดพลาด!', 'ลองอีกครั้งในภายหลัง')}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors active:scale-95"
            >
              Error
            </button>
            <button
              onClick={() => toast.info('แจ้งเตือน', 'มีข้อมูลใหม่เข้ามา')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors active:scale-95"
            >
              Info
            </button>
          </div>
        </section>

        {/* Modal Demo */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Modal Dialog</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => openModal('success')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors active:scale-95"
            >
              Success
            </button>
            <button
              onClick={() => openModal('warning')}
              className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors active:scale-95"
            >
              Warning
            </button>
            <button
              onClick={() => openModal('error')}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors active:scale-95"
            >
              Error
            </button>
            <button
              onClick={() => openModal('info')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors active:scale-95"
            >
              Info
            </button>
          </div>
        </section>

        {/* Modal Component */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          icon={modalType}
          title={
            modalType === 'success'
              ? 'สำเร็จ'
              : modalType === 'warning'
                ? 'คำเตือน'
                : modalType === 'error'
                  ? 'เกิดข้อผิดพลาด'
                  : 'แจ้งเตือน'
          }
          subtitle="นี่คือตัวอย่างของ Modal component"
          buttons={[
            {
              label: 'ยกเลิก',
              variant: 'secondary',
              onClick: () => setModalOpen(false),
            },
            {
              label: 'ยืนยัน',
              variant: 'primary',
              onClick: () => {
                toast.success('ยืนยันสำเร็จ!')
                setModalOpen(false)
              },
            },
          ]}
        />

        {/* SpeedDial Demo */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Speed Dial FAB</h2>
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center overflow-hidden">
            <div className="absolute bottom-8 right-8">
              <SpeedDial
                direction="up"
                size="md"
                mainColor="bg-blue-500"
                actions={[
                  {
                    icon: <BsChat className="text-lg" />,
                    label: 'แชท',
                    onClick: () => toast.info('เปิดแชท'),
                    color: 'bg-purple-500 text-white',
                  },
                  {
                    icon: <BsShare className="text-lg" />,
                    label: 'แชร์',
                    onClick: () => toast.info('แชร์โปรไฟล์'),
                    color: 'bg-blue-500 text-white',
                  },
                  {
                    icon: <BsHeart className="text-lg" />,
                    label: 'ถูกใจ',
                    onClick: () => toast.success('บันทึกแล้ว'),
                    color: 'bg-red-500 text-white',
                  },
                ]}
              />
            </div>
            <p className="text-gray-500 font-semibold">กดปุ่มสีน้ำเงินด้านล่างขวา</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
