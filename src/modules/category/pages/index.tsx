import { useState } from "react";
import { useGetCategory } from "../hooks/queries";
import CategoryModal from "./modal";
import { Button, Tooltip, Popconfirm, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Category as CategoryType, CategoryDataType } from "../types";
import { deleteCategory } from "../service";
import { GlobalTable, Loading } from "@components";
import { ColumnsType } from "antd/es/table";
import { ParamsType } from "@types";
import { useQueryClient } from "@tanstack/react-query";

const Category = () => {
  const [params, setParams] = useState<ParamsType>({
    limit: 3,
    page: 1,
    search: "",
  });

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<CategoryDataType | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetCategory(params);

  const handleClose = () => {
    setOpen(false);
    setUpdateData(null);
  };

  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
  }) => {
    const { current = 1, pageSize = 10 } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));

    const current_params = new URLSearchParams(window.location.search);
    current_params.set("page", `${current}`);
    current_params.set("limit", `${pageSize}`);
    navigate(`?${current_params.toString()}`);
  };

  if (isLoading) return <Loading />;

  const columns: ColumnsType<CategoryType> = [
    {
      title: "T/R",
      dataIndex: "index",
      render: (_text, _record, index) =>
        index + 1 + (params.page - 1) * params.limit,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CategoryDataType) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                setUpdateData(record);
                setOpen(true);
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => {
              deleteCategory(record.id);
              queryClient.invalidateQueries({ queryKey: ["category"] });
            }}
          >
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Sub-category">
            <Button
              onClick={() =>
                navigate(`/admin-layout/sub-category/${record.id}`)
              }
              icon={<ArrowRightOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CategoryModal
        open={open}
        handleClose={handleClose}
        update={updateData}
      />
      <Button
        onClick={() => {
          setOpen(true);
          setUpdateData(null);
        }}
        className='bg-[#AD8354] text-white mb-2'
      >
        Create Category
      </Button>

      <GlobalTable
        columns={columns}
        data={data?.data?.categories || []}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.total || 2,
          showSizeChanger: true,
          pageSizeOptions: ["3", "5", "7", "10", "12"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Category;
